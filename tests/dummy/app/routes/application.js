import { action } from '@ember/object';

import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
	@service crypto;

	@service loadingMask;

	@service notification;

	afterModel() {
		setTimeout(() => this.loadingMask.hide(), 100);
	}

	setupController(controller) {
		super.setupController(...arguments);
		controller.jsonString = this.crypto.JSON.stringify({
			string: 'test',
			number: 10000,
			func() {
				return 'test';
			}
		}, null, 4);
	}

	@action
	loading(type = 'show') {
		this.loadingMask[type]();
	}

	@action
	notify(type = 'alert') {
		this.notification[type](`Test ${type}`);
	}
}
