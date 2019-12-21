export function initialize() {
	// Override app bucket initializer in fastboot environment
}

export default {
	name: 'orbit-main-bucket',
	after: 'ember-orbit-config',
	initialize
};
