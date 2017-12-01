import { inject } from '@ember/service';

import Route from '@ember/routing/route';

import SetupController from 'ember-cli-utilities/mixins/setup-controller';

export default Route.extend(SetupController, {

	matrix: inject(),

	notification: inject(),

	afterRender() {
		this.get('matrix').run();
	},

	actions: {
		notify(type = 'alert') {
			this.get('notification')[type](`Test ${type}`);
		}
	}
});
