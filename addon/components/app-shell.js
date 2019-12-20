import config from 'ember-get-config';

import Component from '@glimmer/component';

import { tracked } from '@glimmer/tracking';

import { inject as service } from '@ember/service';

export default class AppShell extends Component {
	@tracked index = 0;

	@service media;
	@service global;
	@service router;
	@service session;
	@service navigation;

	constructor() {
		super(...arguments);

		const { head } = config;

		// this.navigation.type = this.media.isGtSm ? 'sidebar' : 'navbar';
		// this.navigation.position = this.media.isGtSm ? 'left' : 'bottom';

		this.navigation.logo = head.logo;
		this.navigation.title = head.title;

		this.navigation.profile = {};
		this.navigation.profile.name = 'Not logged in';
		this.navigation.profile.image = '/assets/images/default/user-default-image.png';

		this.navigation.links = [];
		this.navigation.links.push({
			name: 'Home',
			route: 'home',
			icon: 'home'
		});
	}
}
