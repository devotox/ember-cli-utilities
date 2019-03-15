export function initialize(application) {
	let navigator = window.navigator || {};
	let intl = application.lookup('service:intl');
	let device = application.lookup('service:device');

	let allLanguages = intl.get('locales');
	let userLanguage = (device.query('lang') || navigator.language).toLowerCase();

	let currentLanguage = allLanguages.includes(userLanguage) 
		? userLanguage : intl.get('locale')[0]

	intl.set('locale', currentLanguage);
	intl.set('primaryLocale', currentLanguage);

	console.info('[intl]', 'User Language:', userLanguage); // eslint-disable-line
	console.info('[intl]', 'Current Language:', currentLanguage); // eslint-disable-line
	console.info('[intl]', 'All Languages:', allLanguages.join(', ')); // eslint-disable-line
}

export default {
	name: 'intl',
	after: 'ember-intl',
	initialize
};