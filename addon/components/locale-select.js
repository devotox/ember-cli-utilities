import Component from '@glimmer/component';

import { inject as service } from '@ember/service';

import { computed, action, get, set } from '@ember/object';

export default class LocaleSelect extends Component {
	@service intl;
	locale = '';

	constructor() {
		super(...arguments);

		let intl = get(this, 'intl');
		let locales = get(this, 'locales');
		let locale = intl.get('primaryLocale');

		let selectedLocale = locales.find(({ id }) => locale === id);

		this.localeSelected(selectedLocale);
	}

	@computed('intl.{locale,locales}')
	get locales() {
		let intl = get(this, 'intl');
		let locales = intl.get('locales');

		return locales.map((id) => {
			let label = intl.t(`components.locale-select.locale.${id}`);
			label.includes('Missing') && (label = id);
			return { id, label };
		});
	}

	@action
	localeSelected(locale) {
		if(!locale || !locale.id) { return; }

		set(this, 'locale', locale);

		let intl = get(this, 'intl');
		intl.set('locale', locale.id);
	}
}
