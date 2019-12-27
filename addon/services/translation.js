import fetch from 'fetch';

import Service, { inject } from '@ember/service';

export default class TranslationService extends Service {
	@inject intl;

	path = 'api/translations.json';

	async fetch() {
		let path = this.get('path');
		let translations = await fetch(path);
		this.addTranslations(translations);
	}

	addTranslations(json) {
		let intl = this.get('intl');

		Object.keys(json).forEach((locale) => {
			intl.addTranslations(locale, json[locale]);
		});
	}
}
