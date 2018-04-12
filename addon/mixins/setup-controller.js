import { run } from '@ember/runloop';

import Mixin from '@ember/object/mixin';

export default Mixin.create({

	pageName: '',

	afterRender() {},

	appController: null,

	setupController(controller) {
		this._super(...arguments);

		let pageName = this.get('pageName');

		let appController = this.controllerFor('application');

		controller.set('pageName', pageName);

		this.set('appController', appController);

		run.scheduleOnce('afterRender', this, this.afterRender);
	}
});
