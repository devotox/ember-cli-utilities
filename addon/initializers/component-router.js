export function initialize(application) {
	application.inject('component', 'router', 'router:main');
}

export default {
	name: 'component-router',
	initialize
};
