import { inject } from '@ember/service';

import Route from '@ember/routing/route';

import RunMixin from 'ember-lifeline/mixins/run';

import SetupController from 'ember-cli-utilities/mixins/setup-controller';

const testOject = {
	string: 'test',
	number: 10000,
	func() {
		return 'test';
	}
};

export default Route.extend(SetupController, RunMixin, {

	crypto: inject(),

	matrix: inject(),

	loadingMask: inject(),

	notification: inject(),

	setupController() {
		const crypto = this.get('crypto');
		const jsonString = crypto.JSON.stringify(testOject, null, 4);
		this.controller.set('jsonString', jsonString);
	},

	afterRender() {
		this.get('matrix').run();
	},

	actions: {
		loading(type = 'show') {
			this.get('loadingMask')[type]();
		},
		notify(type = 'alert') {
			this.get('notification')[type](`Test ${type}`);
		},
		willTransition() {
			this.runTask(() => this.get('loadingMask').show(), 0);
		},
		didTransition() {
			this.runTask(() => this.get('loadingMask').hide(), 0);
		}
	}
});
