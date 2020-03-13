import { action } from '@ember/object';

import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
	@service crypto;

	@service notification;

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
	notify(type = 'alert') {
		this.notification[type](`Test ${type}`);
	}
}
