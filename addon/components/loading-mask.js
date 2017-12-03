import { Promise } from 'rsvp';

import { inject } from '@ember/service';

import Component from '@ember/component';

import RunMixin from 'ember-lifeline/mixins/run';

import layout from '../templates/components/loading-mask';

export default Component.extend(RunMixin, {
	layout,

	promise: null,

	hidden: false,

	maxLoadingTime: 5000,

	loadingMask: inject(),

	init() {
		this._super(...arguments);
		this.setLoadingMaskService();
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
				loading: this.loading.bind(this)
			});
	},

	loadPromise(promise) {
		this.loading();

		promise && Promise.resolve(promise)
			.then(this.hide.bind(this));
	},

	loading(show = true) {
		show ? this.show() : this.hide();
	},

	show() {
		if (this.isRemoved()) { return; }

		let mlt = this.get('maxLoadingTime');
		this.debounceTask('hide', mlt);
		this.set('hidden', false);
	},

	hide() {
		if (this.isRemoved()) { return; }
		this.set('hidden', true);
	},

	isRemoved() {
		return this.isDestroyed || this.isDestroying;
	}
});
