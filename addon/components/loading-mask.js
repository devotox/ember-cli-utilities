import { Promise } from 'rsvp';

import { inject } from '@ember/service';

import Component from '@ember/component';

import RunMixin from 'ember-lifeline/mixins/run';

import layout from '../templates/components/loading-mask';

export default Component.extend(RunMixin, {
	layout,

	promise: null,

	hidden: false,

	fastboot: inject(),

	maxLoadingTime: 5000,

	loadingMask: inject(),

	init() {
		this._super(...arguments);
		this.setLoadingMaskService();

		this.get('fastboot.isFastBoot')
			&& this.set('hidden', true);
	},

	didReceiveAttrs() {
		let promise = this.get('promise');
		this.loadPromise(promise);
	},

	setLoadingMaskService() {
		this.get('loadingMask')
			.setProperties({
				hide: this.hide.bind(this),
				show: this.show.bind(this),
				loadPromise: this.loadPromise.bind(this),
				maxLoadingTime: this.get('maxLoadingTime')
			});
	},

	loadPromise(promise) {
		this.show();

		promise && Promise.resolve(promise)
			.then(this.hide.bind(this));
	},

	show(noHide) {
		if (this.isRemoved()) { return; }
		this.set('hidden', false);
		if (noHide) { return; }

		let mlt = this.get('maxLoadingTime');
		this.debounceTask('hide', mlt);
	},

	hide() {
		if (this.isRemoved()) { return; }
		this.set('hidden', true);
	},

	isRemoved() {
		return this.isDestroyed || this.isDestroying;
	}
});
