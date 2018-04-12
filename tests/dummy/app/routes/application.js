import { inject } from '@ember/service';

import Route from '@ember/routing/route';

import RunMixin from 'ember-lifeline/mixins/run';

import SetupController from 'ember-cli-utilities/mixins/setup-controller';

export default Route.extend(SetupController, RunMixin, {

	matrix: inject(),

	loadingMask: inject(),

	notification: inject(),

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
