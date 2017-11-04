import Service, { inject } from '@ember/service';

import fetch from 'fetch';

export default Service.extend({
	i18n: inject(),

	path: 'api/translations.json',

	async fetch() {
		let path = this.get('path');
		let translations = await fetch(path);
		this.addTranslations(translations);
	},

	addTranslations(json) {
		let i18n = this.get('i18n');

		Object.keys(json).forEach((locale) => {
			i18n.addTranslations(locale, json[locale]);
		});
	}
});
