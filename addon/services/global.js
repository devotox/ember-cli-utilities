import Service, { inject as service } from '@ember/service';

import { action } from '@ember/object';

export default class Global extends Service {
	@service utils;
	@service router;
	@service navigation;
	@service notification;

	@action
	comingSoonNotification() {
		const message = '⚡️ 🔥 💥 COMING SOON! ⚡️ 🔥 💥';
		this.notification.system(message);
		this.notification.alert(message);
		this.notification.hub(message);
	}

	@action
	transition(route) {
		this.utils.draf(() => this.router.transitionTo(route));
	}

}