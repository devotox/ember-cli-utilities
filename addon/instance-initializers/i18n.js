export function initialize(application) {
	let navigator = window.navigator || {};
	let i18n = application.lookup('service:i18n');
	let device = application.lookup('service:device');

	let allLanguages = [].concat(i18n.get('locales'));
	let previousLanguage =  i18n.get('locale') || 'en';
	let userLanguage = device.query('lang') || navigator.language;

	i18n.set('locale', function() {
		let lang = (userLanguage || previousLanguage).toLowerCase();
		return allLanguages.includes(lang) ? lang : previousLanguage;
	}());

	console.info('[i18n]', 'User Language:', userLanguage);
	console.info('[i18n]', 'Previous Language:', previousLanguage);
	console.info('[i18n]', 'Current Language:', i18n.get('locale'));
	console.info('[i18n]', 'All Languages:', allLanguages.join(', '));
}

export default {
	name: 'i18n',
	after: 'ember-i18n',
	initialize
};
