import fetch from 'fetch';

import { computed } from '@ember/object';

import { getOwner } from '@ember/application';

import Service, { inject } from '@ember/service';

export default Service.extend({

	// To be set by extension
	host: '',

	proxyURL: '',

	namespace: 'api',

	maxCacheTime: 5 * 60 * 1000,

	// To be set by extension

	cache: {}, // eslint-disable-line

	fetching: {}, // eslint-disable-line

	utils: inject(),

	crypto: inject(),

	offline: inject(),

	fastboot: computed(function() {
		return getOwner(this).lookup('service:fastboot');
	}),

	invalidateCache(timestamp) {
		let currentTime = +new Date();
		let maxCacheTime = this.get('maxCacheTime');
		return currentTime > timestamp + maxCacheTime;
	},

	init() {
		[
			'get', 'put', 'post',
			'head', 'patch', 'delete'
		].forEach((method) => {
			let self = this;
      this._super(...arguments);

			this[method === 'get' && 'fetch' || method] = function() {
				return self.request(method, ...arguments);
			};
		});
	},

	async request(method = 'GET', api, data = {}, headers = {}, { form, contentType, responseType, bypassCache, useProxy } = {}) {
		method = method.toLowerCase();
		bypassCache = bypassCache || false;
		responseType = responseType || 'json';
		contentType = contentType || 'application/json; charset=utf-8';

		headers = this.createHeaders(headers, contentType);
		let dataType = method !== 'get' ? 'body' : 'params';
		let url = this.createUrl(method, api, data, useProxy);

		data = method === 'get' ? data
			: form ? new FormData(form)
				: JSON.stringify(data || {});

		let request = {
			headers,
			contentType,
			mode: 'cors',
			[dataType]: data,
			method: method.toUpperCase()
		};

		let cache = this.get('cache');
		let crypto = this.get('crypto');
		let fetching = this.get('fetching');
		let cacheKey = crypto.hash(`${url}-${JSON.stringify(data)}`);

		let cachedResponse = cache[cacheKey];

		if (!bypassCache && cachedResponse) {
			let { timestamp, response } = cachedResponse;

			if (!this.invalidateCache(timestamp)) {
				return response;
			}
		}

		try {
			fetching[cacheKey] = fetching[cacheKey] || fetch(url, request);
			this.set('fetching', fetching);

			let timestamp = +new Date();
			let data = (await fetching[cacheKey]).clone();
			let response = await this.finish(data, responseType);

			cache[cacheKey] = { response, timestamp };
			this.set('cache', cache);

			delete fetching[cacheKey];
			return response;
		}
		catch(error) {
			return cachedResponse
				|| this.error(error);
		}
	},

	async finish(response, type = 'json') {
		if (!response.ok) {
			return this.error(response);
		}

		try {
			return response
				&& response[type]
				&& response[type]();
		}
		catch(e) {
			return response;
		}
	},

	async error(response) {

		let fromBlob = async() => {
			if (!response.blob) { return; }
			let blob = await response.blob();
			return await this.get('crypto').fromBlob(blob);
		};

		let message = response.message
			|| response.statusText
			|| await fromBlob();

		console.info('[API Error]', message); // eslint-disable-line

		let error = new Error(message);
		error.code = response.code || response.statusCode || 505;

		if (this.get('fastboot.isFastBoot')) {
			return this.set('fastboot.response.statusCode', error.code);
		}

		throw error;
	},

	createUrl(method, endpoint, data, useProxy) {
		let qs = this.params(data);
		let host = this.get('host');
		let proxyURL = this.get('proxyURL');
		let namespace = this.get('namespace');

		if (this.get('fastboot.isFastBoot')) {
			host = this.get('fastboot.request.host');
			host = `https://${host}`;
		}

		if (!endpoint) {
			throw new Error('No Endpoint Specified');
		}
		else if (namespace) {
			endpoint = endpoint.replace(new RegExp(`^(/+)?(${namespace})?(/+)?`), '');
		}

		let url = `${host}/${namespace}/${endpoint}`.replace(/\/$/, '');
		url = useProxy ? `${proxyURL}/${url.replace('://', ':/')}` : url;

		return method !== 'get' ? url : `${url}${qs}`;
	},

	createHeaders(headers, contentType) {
		headers = Object.assign({
			'Content-Type': contentType
		}, headers);

		Object.keys(headers).forEach(
			(key) => !headers[key] && delete headers[key]
		);

		return headers;
	},

	params(obj = {}, prefix) {
		let qs = Object.keys(obj).map((k) => {
			let v = obj[k];
			let p = prefix ? `${prefix}[${k}]` : k;
			let isObject = this.get('utils').isObject(v);

			return isObject
				? this.params(v, p)
				: `${encodeURIComponent(p)}=${encodeURIComponent(v)}`;
		}).join('&').trim();

		!prefix && qs && qs.length && (qs = `?${qs}`);
		return qs && qs.length && qs || '';
	}
});
