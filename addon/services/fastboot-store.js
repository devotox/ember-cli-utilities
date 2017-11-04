import { computed } from '@ember/object';

import Service, { inject } from '@ember/service';

export default Service.extend({

	fastboot: inject(),

	globalStore: 'globalStore',

	shoebox: computed.alias('fastboot.shoebox'),

	isFastBoot: computed.alias('fastboot.isFastBoot'),

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
