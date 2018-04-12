import Service, { inject } from '@ember/service';

import { get, set, computed } from '@ember/object';

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
export default Service.extend({
	live: [], // eslint-disable-line

	links: [], // eslint-disable-line

	open: false,

	i18n: inject(),

	title: 'Default',

	image: 'favicon.ico',

	nav: computed('links', function() {
		let i18n = this.get('i18n');

		let links = this.get('links');

		return links.map((link) => {
			link.name =  i18n.t(`navigation.${link.route}`);
			return link;
		});
	}).property('i18n.locale'),

	init() {
		this._super(...arguments);
		this.setup();
	},

	setup() {
		let live = this.get('live');

		this.get('links').forEach((link) => {
			let route = get(link, 'route')
				|| get(link, 'action');

			!live.includes(route)
				&& set(link, 'hide', true);
		});
	}
});
