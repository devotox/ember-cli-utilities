import { inject } from '@ember/service';

import { computed } from '@ember/object';

import Component from '@ember/component';

import layout from '../templates/components/locale-select';

export default Component.extend({
	layout,

	i18n: inject(),

	locales: computed('i18n.locales', function() {
		let i18n = this.get('i18n');
		let locale = i18n.get('locale');
		let locales = i18n.get('locales');
		locales && locales.length || (locales = [locale]);

		return locales.map((id) => {
			let label = i18n.t(`components.locale-select.locale.${id}`);
			label.includes('Missing') && (label = id);
			let localeData = { id, label };

			locale === id
				&& this.set('locale', localeData);

			return localeData;
		});
	}).property('i18n.locale'), // Needed so the label changes when the language changes

	actions: {
		localeSelected({ id }) {
			let i18n = this.get('i18n');
			i18n.set('locale', id);
		}
	}
});

