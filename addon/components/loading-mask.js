import { Promise } from 'rsvp';

import Component from '@ember/component';

import RunMixin from 'ember-lifeline/mixins/run';

import layout from '../templates/components/loading-mask';

export default Component.extend(RunMixin, {
	layout,

	promise: null,

	hidden: false,

	maxLoadingTime: 5000,

	didReceiveAttrs() {
		this.loading();

		let promise = this.get('promise');

		promise && Promise.resolve(promise)
			.then(this.hide.bind(this));
	},

	isRemoved() {
		return this.isDestroyed || this.isDestroying;
	},

	loading(show = true) {
		show ? this.show() : this.hide();
	},

	show() {
		if (this.isRemoved()) { return; }

		this.set('hidden', false);
		this.debounceTask('hide', this.get('maxLoadingTime'));
	},

	hide() {
		if (this.isRemoved()) { return; }

		this.set('hidden', true);
	}
});
