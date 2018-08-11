import DS from 'ember-data';

import { Promise } from 'rsvp';

import { run } from '@ember/runloop';

import { inject } from '@ember/service';

import { debug } from '@ember/debug';

import ArrayProxy from '@ember/array/proxy';

import { getOwner } from '@ember/application';

import { get, set, computed } from '@ember/object';

const { Offline } = window;

const { Store, PromiseArray } = DS;

// This will allow us to have the ability to use IDs / Slugs (URI IDs)
export default Store.extend({

	crypto: inject(),

	queryCacheResults: {}, // eslint-disable-line

	fastboot: computed(function() {
		return getOwner(this).lookup('service:fastboot');
	}),

	init() {
		this._super(...arguments);

		debug('[Store]', '!!! USING CUSTOM STORE !!!');

		this.set('modelSlugCache', new Map());

		this.set('queryCache', ArrayProxy.extend({
			meta: computed.alias('content.meta')
		}));
	},

	willDestroy() {
		this._super(...arguments);

		this.get('modelSlugCache').clear();
		delete this.modelSlugCache;
	},

	// NOTE: This function uses private methods and could break in a future upgrade
	// But is used to make the code more readable, maintainable and allows no need to change adapter code
	_getRecords(modelName, id) {
		let model = this.modelFor(modelName);
		let records = this._internalModelsFor(model);
		return id ? records && records.get(id) : records;
	},
	_unloadSlug(modelName, idOrSlug) {
		let record = this._getRecords(modelName, idOrSlug);
		return record && record.unloadRecord();
	},
	_addSlug(record, modelName, idOrSlug, slugCache) {
		let id = record.get('id');
		slugCache.set(id, id);

		if (idOrSlug !== id) {
			slugCache.set(idOrSlug, id);
			this._unloadSlug(modelName, idOrSlug);
		}

		return record;
	},
	_loadPromiseArray(array, queryFn) {
		return array.promise = queryFn()
			.then((innerArray) => {
				set(array, 'isLoaded', true);
				set(array, 'isUpdating', false);
				set(array, 'content', innerArray);
				return this._promiseArray(array);
			});
	},
	_promiseArray(promise) {
		promise = Promise.resolve(promise);
		return PromiseArray.create({ promise });
	},
	_hashForQuery(modelName, query) {
		let key = modelName + JSON.stringify(query);
		return this.get('crypto').hash(key);
	},
	_getCachedQuery(modelName, query) {
		let hash = this._hashForQuery(modelName, query);
		let cachedResults = this.get('queryCacheResults');
		return cachedResults[hash] || this._addCachedQuery(hash);
	},
	_addCachedQuery(hash) {
		return this.get('queryCacheResults')[hash] = this.get('queryCache').create({
			isUpdating: true,
			isLoaded: false,
			store: this
		});
	},
	findRecord(modelName, idOrSlug, ...args) {
		let modelSlugCache = this.get('modelSlugCache');
		let slugCache = modelSlugCache.get(modelName);
		let id = slugCache && slugCache.get(`${idOrSlug}`);
		!slugCache && modelSlugCache.set(modelName, new Map());

		return id
			? this._super(modelName, id, ...args)
			: this._super(...arguments)
				.then((record) => this._addSlug(record, modelName, idOrSlug, slugCache));
	},
	query(modelName, query, options = {}) {
		let typeClass = this.modelFor(modelName);
		let adapter = this.adapterFor(modelName);

		debug(`You tried to load a query but you have no adapter for (${typeClass})`, adapter);
		debug('You tried to load a query but your adapter does not implement `query`',
			typeof adapter.query === 'function' || typeof adapter.findQuery === 'function');

		let array = this._getCachedQuery(modelName, query);
		let load = this._loadPromiseArray.bind(this, array, this._super.bind(this, modelName, query));

		if (Offline && Offline.state !== 'up') {
			return this._promiseArray(array);
		}

		if (options.reload
			|| !get(array, 'isLoaded')
			|| this.get('fastboot.isFastBoot')) {
			set(array, 'isUpdating', true);
			return load();
		}

		let isUpdating = get(array, 'isUpdating');
		let shouldReloadRecord = adapter.shouldReloadRecord(this, array, query);
		let shouldBackgroundReloadRecord = adapter.shouldBackgroundReloadRecord(this, array, query);

		if (!isUpdating
			&& (shouldReloadRecord
				|| shouldBackgroundReloadRecord)) {
			set(array, 'isUpdating', true);
			run.later(load, 2000);
		}

		return this._promiseArray(array);
	},
	queryOne() {
		return this.query(...arguments)
			.then((results) => results.objectAt(0));
	},
	queryWhere(modelName, where) {
		return this.query(modelName, {
			filter: { where }
		});
	},
	queryRecordBy(modelName, id, by = 'slug') {
		return this.query(modelName, {
			filter: { where: { [by]: id } }
		});
	},
	queryOneRecordBy(modelName, id, by = 'slug') {
		return this.queryOne(modelName, {
			filter: { where: { [by]: id } }
		});
	}
});
