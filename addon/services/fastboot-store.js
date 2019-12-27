import Service from '@ember/service';

import { computed, get } from '@ember/object';

import { alias } from '@ember/object/computed';

import { getOwner } from '@ember/application';

export default class FastbootStoreService extends Service {
	globalStore = 'globalStore';

	shoebox = alias('fastboot.shoebox');

	isFastBoot = alias('fastboot.isFastBoot');

	@computed()
	get fastboot() {
		return getOwner(this).lookup('service:fastboot');
	}

	createStore(storeName, store = {}) {
		get(this, 'isFastBoot')
			&& get(this, 'shoebox').put(storeName, store);
		return store;
	}

	getStore(storeName) {
		storeName = storeName || get(this, 'globalStore');
		return get(this, 'shoebox').retrieve(storeName)
			|| this.createStore(storeName);
	}

	getItem(key, storeName) {
		let data = this.getStore(storeName)[key];
		this.removeItem(key, storeName);
		return data;
	}

	setItem(key, data, storeName) {
		return !get(this, 'isFastBoot') && data
			|| (this.getStore(storeName)[key] = data);
	}

	removeItem(key, storeName) {
		!get(this, 'isFastBoot')
			&& delete this.getStore(storeName)[key];
	}
}
