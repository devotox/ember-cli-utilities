export function initialize(application) {
	[
		'route',
		'component',
		'controller'
	].forEach((type) => {
		application.inject(type, 'session', 'service:session');
	});

	application.inject('ability', 'session', 'simple-auth-session:main');
}

export default {
	name: 'session-ability',
	after: 'ember-simple-auth',
	initialize
};
