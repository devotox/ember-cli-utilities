import { inject } from '@ember/service';

import { computed } from '@ember/object';

import Component from '@ember/component';

import layout from '../templates/components/locale-select';

export default Component.extend({
	layout,

	intl: inject(),

	init() {
		this._super();

		let intl = this.get('intl');
		let locales = this.get('locales');
		let locale = intl.get('primaryLocale');

		let selectedLocale = locales.find(({ id }) => locale === id);

		this.actions.localeSelected.call(this, selectedLocale);
	},

	locales: computed('intl.locales', function() {
		let intl = this.get('intl');
		let locales = intl.get('locales');

		return locales.map((id) => {
			let label = intl.t(`components.locale-select.locale.${id}`);
			label.includes('Missing') && (label = id);
			return { id, label };
		});
	}).property('intl.locale'), // Needed so the label changes when the language changes

	actions: {
		localeSelected(locale) {
			this.set('locale', locale);
			let intl = this.get('intl');
			intl.set('locale', locale.id);
		}
	}
});

