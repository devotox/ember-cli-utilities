module.exports = function(/*environment*/) {
	return {
		// ... other settings here

		// Default Orbit settings (any of which can be overridden)
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
		}
	};
};
