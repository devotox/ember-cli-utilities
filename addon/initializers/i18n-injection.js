export function initialize(application) {
	[
		'model',
		'route',
		'component',
		'controller'
	].forEach((type) => {
		application.inject(type, 'i18n', 'service:i18n');
	});
}
export default {
	name: 'i18n',
	after: 'ember-i18n',
	initialize
};
