import { computed } from '@ember/object';

import { tracked } from '@glimmer/tracking';

import Service, { inject as service } from '@ember/service';

/*
	@Service
	This file along with application.hbs
	handles our site navigation & page structure

	open - used to toggle the side navigation open or closed
	title - Sets the title on the navigation bar
	image - sets the image on navigation bar
	live - used to keep a list of links we actually want to allow routability
	links - array of links that show up in side navigation
		hide - does not show route in sidebar (useful so that route name can still be populated in topbar)
		route - if set this will be the route (set in Router.js) transitioned to on click
		action - runs action set in route actions object
		name - sets the name on the side navigation
		icon - sets icon image for each menu item
		authenticated - show link when authenticated or not
			true - only shows link when logged in
			false - only shows link when not logged in
			undefined - shows link both when logged in and not logged in
 */
export default class Navigation extends Service {
	@service intl;

	@tracked
	live = [];

	@tracked
	links = [];

	@tracked
	profile = {};

	@tracked
	open = false;

	@tracked
	title = 'Title';

	@tracked
	image = 'favicon.ico';

	@tracked
	type = 'sidebar' // sidebar, navbar

	@tracked
	position = 'left'; // left, right, top, bottom

	constructor() {
		super(...arguments);

		this.links.forEach((link) => {
			let route = link.route || link.action;
			!this.live.includes(route) && (link.hide = true);
		})
	}

	@computed('links', 'intl.locale')
	get nav() {
		return this.links.map((link) => {
			link.name = this.intl.t(`navigation.${link.route}`);
		})
	}	
}
