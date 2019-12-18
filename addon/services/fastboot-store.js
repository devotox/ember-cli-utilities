import { alias } from '@ember/object/computed';
import Service from '@ember/service';

import { computed } from '@ember/object';

import { getOwner } from '@ember/application';

export default Service.extend({

	globalStore: 'globalStore',

	shoebox: alias('fastboot.shoebox'),

	isFastBoot: alias('fastboot.isFastBoot'),

	fastboot: computed(function() {
		return getOwner(this).lookup('service:fastboot');
	}),

	createStore(storeName, store = {}) {
		this.get('isFastBoot')
			&& this.get('shoebox').put(storeName, store);
		return store;
	},

	getStore(storeName) {
		storeName = storeName || this.get('globalStore');
		return this.get('shoebox').retrieve(storeName)
			|| this.createStore(storeName);
	},

	getItem(key, storeName) {
		let data = this.getStore(storeName)[key];
		this.removeItem(key, storeName);
		return data;
	},

	setItem(key, data, storeName) {
		return !this.get('isFastBoot') && data
			|| (this.getStore(storeName)[key] = data);
	},

	removeItem(key, storeName) {
		!this.get('isFastBoot')
			&& delete this.getStore(storeName)[key];
	}
});
