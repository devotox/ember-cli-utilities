import fetch from 'fetch';

import Service, { inject } from '@ember/service';

import { get } from '@ember/object';

export default class TranslationService extends Service {
	@inject intl;

	path = 'api/translations.json';

	async fetch() {
		let path = get(this, 'path');
		let translations = await fetch(path);
		this.addTranslations(translations);
	}

	addTranslations(json) {
		let intl = get(this, 'intl');

		Object.keys(json).forEach((locale) => {
			intl.addTranslations(locale, json[locale]);
		});
	}
}
