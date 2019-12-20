'use strict';

module.exports = function(environment) {
	let ENV = {
		modulePrefix: 'dummy',
		environment,
		rootURL: '/',
		locationType: 'auto',
		orbit: {
			types: {
				bucket: 'data-bucket',
				model: 'data-model',
				source: 'data-source',
				strategy: 'data-strategy'
			},
			collections: {
				buckets: 'data-buckets',
				models: 'data-models',
				sources: 'data-sources',
				strategies: 'data-strategies'
			},
			services: {
				store: 'data-store',
				coordinator: 'data-coordinator',
				schema: 'data-schema',
				keyMap: 'data-key-map'
			},
			skipStoreService: false,
			skipStoreInjections: false,
			skipCoordinatorService: false,
			skipSchemaService: false,
			skipKeyMapService: false
		},
		EmberENV: {
			FEATURES: {
				// Here you can enable experimental features on an ember canary build
				// e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
			},
			EXTEND_PROTOTYPES: {
				// Prevent Ember Data from overriding Date.parse.
				Date: false
			}
		},

		APP: {
			// Here you can pass flags/options to your application instance
			// when it is created
		}
	};

	if (environment === 'development') {
		// ENV.APP.LOG_RESOLVER = true;
		// ENV.APP.LOG_ACTIVE_GENERATION = true;
		// ENV.APP.LOG_TRANSITIONS = true;
		// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		// ENV.APP.LOG_VIEW_LOOKUPS = true;
	}

	if (environment === 'test') {
		// Testem prefers this...
		ENV.locationType = 'none';

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
		ENV.APP.autoboot = false;
	}

	if (environment === 'production') {
		// here you can enable a production-specific feature
	}

	return ENV;
};
