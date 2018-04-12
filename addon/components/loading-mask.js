import { Promise } from 'rsvp';

import { inject } from '@ember/service';

import { computed } from '@ember/object';

import Component from '@ember/component';

import { getOwner } from '@ember/application';

import RunMixin from 'ember-lifeline/mixins/run';

import layout from '../templates/components/loading-mask';

export default Component.extend(RunMixin, {
	layout,

	promise: null,

	hidden: false,

	maxLoadingTime: 5000,

	loadingMask: inject(),

	fastboot: computed(function() {
		return getOwner(this).lookup('service:fastboot');
	}),

	init() {
		this._super(...arguments);
		this.setLoadingMaskService();
	},

	didReceiveAttrs() {
		if (this.get('fastboot.isFastBoot')) { return this.hide(); }
		if (this.get('hidden')) { return; }

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
