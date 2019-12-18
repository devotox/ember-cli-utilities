'use strict';

const { name } = require('./package');

module.exports = {
	name,

	options: {
		sassOptions: {
			includePaths: [
				'app/styles',
				'addon/styles',
				'addon/components/'
			]
		},
		babel: {
			plugins: [
				'@babel/plugin-transform-block-scoping',
				'@babel/plugin-proposal-throw-expressions',
				'@babel/plugin-proposal-optional-chaining',
				'@babel/plugin-proposal-object-rest-spread',
				'@babel/plugin-transform-async-to-generator',
				'@babel/plugin-proposal-export-namespace-from',
				'@babel/plugin-proposal-nullish-coalescing-operator',
				'@babel/plugin-proposal-logical-assignment-operators',
				['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }]
			]
		},
		'ember-cli-babel': {
			compileModules: true,
			includePolyfill: true,
			disableDebugTooling: true
		},
		'ember-paper': {
			insertFontLinks: false
		},
		'ember-cli-mirage': {
			enabled: false
		},
		'ember-cli-head': {
			suppressBrowserRender: false
		},
		'ember-cli-notifications': {
			includeFontAwesome: false,
			clearDuration: 3500,
			autoClear: true
		},
		'ember-load-css': {
			enabled: true,
			minifyJS: {
				enabled: true
			}
		},
		'ember-font-awesome': {
			useScss: true,
			includeComponent: true,
			includeFontFiles: false,
			removeUnusedIcons: false,
			includeFontAwesomeAssets: true
		},
		moment: {
			allowEmpty: true,
			outputFormat: 'L',
			includeLocales: ['en'],
			includeTimezone: 'subset'
			// localeOutputPath: 'assets/moment-locales'
		},
		pace: {
			// addon-specific options to configure theme
			color: 'blue',
			target: 'body',
			theme: 'minimal',

			// pace-specific options
			// learn more on http://github.hubspot.com/pace/#configuration
			minTime: 100,
			ghostTime: 50,
			catchupTime: 50,
			easeFactor: 1.25,
			initialRate: 0.01,
			startOnPageLoad: true,
			maxProgressPerFrame: 20,
			restartOnPushState: true,
			restartOnRequestAfter: 500,
			elements: {
				checkInterval: 100,
				selectors: ['body', '.ember-view']
			},
			eventLag: {
				minSamples: 10,
				sampleCount: 3,
				lagThreshold: 3
			},
			ajax: {
				trackMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
				trackWebSockets: false,
				ignoreURLs: []
			}
		},
		EmberHammertime: {
			touchActionSelectors: ['button', 'input', 'a', 'textarea'],
			touchActionProperties:
				'touch-action: manipulation; -ms-touch-action: manipulation; cursor: pointer;'
		},
		emberOffline: {
			themes: {
				theme: 'chrome',
				language: 'english'
			},

			// Should we check the connection status immediatly on page load.
			checkOnLoad: true,

			// Should we monitor AJAX requests to help decide if we have a connection.
			interceptRequests: true,

			// Should we store and attempt to remake requests which fail while the connection is down.
			requests: true,

			// Should deduping also take into account the content of the request.
			deDupBody: true,

			// Should we show a snake game while the connection is down to keep the user entertained?
			// It's not included in the normal build, you should bring in js/snake.js in addition to
			// offline.min.js.
			game: false,

			// What url should be used to test online status
			// Defaults to /favicon.ico
			checks: { xhr: { url: '/api/status' } },

			// Should we automatically retest periodically when the connection is down
			// set to false to disable
			reconnect: {
				// How many seconds should we wait before rechecking.
				initialDelay: 10,

				// How long should we wait between retries.
				// Default (1.5 * last delay, capped at 1 hour)
				delay: null
			}
		}
	},

	config() {
		let options = Object.assign({}, this.options, this._getAddonOptions());
		delete options.sassOptions;
		delete options.project;
		delete options.trees;
		return options;
	},

	included() {
		this._super.included.apply(this, arguments);

		this.import('node_modules/normalize.css/normalize.css');
		this.import('node_modules/animate.css/animate.css');
	},

	_findHost() {
		let app;
		let current = this;

		// eslint-disable-next-line
		do {
			app = current.app || app;
		} while (current.parent.parent && (current = current.parent));

		return app || {};
	},

	_getAddonOptions(opt) {
		let topLevelOptions = this._findHost().options;
		let parentOptions = this.parent && this.parent.options;
		if (!opt) { return topLevelOptions || parentOptions; }
		return topLevelOptions && topLevelOptions[opt]
			|| parentOptions && parentOptions[opt];
	},

	_ensureThisImport() {
		if (!this.import) {
			this.import = function importShim(asset, options) {
				let app = this._findHost();
				app.import(asset, options);
			};
		}
	}
};
