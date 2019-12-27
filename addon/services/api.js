import fetch from 'fetch';

import { computed, get, set } from '@ember/object';

import { getOwner } from '@ember/application';

import Service, { inject } from '@ember/service';

export default class ApiService extends Service {
	@inject utils;
	@inject crypto;
	@inject offline;

	host = '';

	proxyURL = '';

	namespace = 'api';

	maxCacheTime = 5 * 60 * 1000;

	cache = {};

	fetching = {};

	@computed()
	get fastboot() {
		return getOwner(this).lookup('service:fastboot');
	}

	destroyed() {
		return get(this, 'isDestroyed') || get(this, 'isDestroying');
	}

	invalidateCache(timestamp) {
		let currentTime = +new Date();
		let maxCacheTime = get(this, 'maxCacheTime');
		return currentTime > timestamp + maxCacheTime;
	}

	init() {
		super.init(...arguments);

		[
			'get', 'put', 'post',
			'head', 'patch', 'delete'
		].forEach((method) => {
			let self = this;

			this[method === 'get' && 'fetch' || method] = function() {
				return self.request(method, ...arguments);
			};
		});
	}

	async request(api, method = 'GET', data = {}, headers = {}, { form, contentType, responseType, bypassCache, useProxy } = {}) {
		method = method.toLowerCase();
		bypassCache = bypassCache || false;
		responseType = responseType || 'json';
		contentType = contentType || 'application/json; charset=utf-8';

		headers = this.createHeaders(headers, contentType);
		let dataType = method !== 'get' ? 'body' : 'params';
		let url = this.createUrl(api, method, data, useProxy);

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

		let cache = get(this, 'cache');
		let crypto = get(this, 'crypto');
		let fetching = get(this, 'fetching');
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
			set(this, 'fetching', fetching);

			let timestamp = +new Date();
			let data = (await fetching[cacheKey]).clone();
			let response = await this.finish(data, responseType);

			if (!this.destroyed()) {
				cache[cacheKey] = { response, timestamp };
				set(this, 'cache', cache);
			}
			delete fetching[cacheKey];
			return response;
		} catch(error) {
			return cachedResponse
				|| this.error(error);
		}
	}

	async finish(response, type = 'json') {
		if (!response.ok) {
			return this.error(response);
		}

		try {
			return response
				&& response[type]
				&& response[type]();
		} catch(e) {
			return response;
		}
	}

	async error(response) {

		let fromBlob = async() => {
			if (!response.blob) { return; }
			let blob = await response.blob();
			return await get(this, 'crypto').fromBlob(blob);
		};

		let message = response.message
			|| response.statusText
			|| await fromBlob();

		console.info('[API Error]', message); // eslint-disable-line

		let error = new Error(message);
		error.code = response.code || response.statusCode || 505;

		if (get(this, 'fastboot.isFastBoot')) {
			return set(this, 'fastboot.response.statusCode', error.code);
		}

		throw error;
	}

	createUrl(endpoint, method, data, useProxy) {
		let qs = this.params(data);
		let host = get(this, 'host');
		let proxyURL = get(this, 'proxyURL');
		let namespace = get(this, 'namespace');

		if (!host && get(this, 'fastboot.isFastBoot')) {
			host = get(this, 'fastboot.request.host');
			host = `https://${host}`;
		}

		if (!endpoint) {
			throw new Error('No Endpoint Specified');
		} else if (namespace) {
			endpoint = endpoint.replace(new RegExp(`^(/+)?(${namespace})?(/+)?`), '');
		}

		let url = `${host}/${namespace}/${endpoint}`.replace(/\/$/, '');
		url = useProxy ? `${proxyURL}/${url.replace('://', ':/')}` : url;

		return method !== 'get' ? url : `${url}${qs}`;
	}

	createHeaders(headers, contentType) {
		headers = Object.assign({
			'Content-Type': contentType
		}, headers);

		Object.keys(headers).forEach(
			(key) => !headers[key] && delete headers[key]
		);

		return headers;
	}

	params(obj = {}, prefix = undefined) {
		let qs = Object.keys(obj).map((k) => {
			let v = obj[k];
			let p = prefix ? `${prefix}[${k}]` : k;
			let isObject = get(this, 'utils').isObject(v);

			return isObject
				? this.params(v, p)
				: `${encodeURIComponent(p)}=${encodeURIComponent(v)}`;
		}).join('&').trim();

		!prefix && qs && qs.length && (qs = `?${qs}`);
		return qs && qs.length && qs || '';
	}
}
