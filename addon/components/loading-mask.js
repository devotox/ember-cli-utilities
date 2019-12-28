import { inject } from '@ember/service';

import Component from '@glimmer/component';

import { getOwner } from '@ember/application';

import { computed, get, set } from '@ember/object';

import { debounceTask, runDisposables } from 'ember-lifeline';

export default class LoadingMaskComponent extends Component {
	promise = null;

	hidden = false;

	@inject loadingMask;

	maxLoadingTime = 5000;

	@computed()
	get fastboot() {
		return getOwner(this).lookup('service:fastboot');
	}

	constructor() {
		super(...arguments);

		Object.assign(this.loadingMask, {
			hide: this.hide.bind(this),
			show: this.show.bind(this),
			maxLoadingTime: this.maxLoadingTime,
			loadPromise: this.loadPromise.bind(this)
		});
	}

	didReceiveAttrs() {
		if (get(this, 'fastboot.isFastBoot')) { return this.hide(); }
		if (this.hidden) { return; }

		this.loadPromise( this.promise);
	}

	loadPromise(promise) {
		this.show();

		promise && Promise.resolve(promise)
			.then(this.hide.bind(this));
	}

	show(noHide) {
		if (this.isRemoved()) { return; }
		set(this, 'hidden', false);
		if (noHide) { return; }

		let mlt = this.maxLoadingTime
		debounceTask('hide', mlt);
	}

	hide() {
		if (this.isRemoved()) { return; }
		set(this, 'hidden', true);
	}

	isRemoved() {
		return this.isDestroyed || this.isDestroying;
	}
	
	willDestroy() {
		super.willDestroy(...arguments);
		runDisposables(this);
	}
}
