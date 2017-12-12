/* eslint-env node */
'use strict';

module.exports = {
	name: 'ember-cli-utilities',

	options: {
		newVersion: false,
		sassOptions: {
			includePaths: [
				'app/styles',
				'addon/styles',
				'addon/components/'
			]
		},
		babel: {
			plugins: [
				'transform-object-rest-spread',
				'transform-async-to-generator'
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
		moment: {
			allowEmpty: true,
			outputFormat: 'L',
			includeLocales: ['en-gb'],
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
		this._ensureThisImport();

		this.import('node_modules/normalize.css/normalize.css');
		this.import('node_modules/animate.css/animate.css');
	},

	_getAddonOptions() {
		return this.parent && this.parent.options
			|| this.app && this.app.options || {};
	},

	_ensureThisImport() {
		if (!this.import) {
			this._findHost = function findHostShim() {
				let current = this;
				let app;

				// eslint-disable-next-line
				do {
					app = current.app || app;
				} while (current.parent.parent && (current = current.parent));

				return app;
			};
			this.import = function importShim(asset, options) {
				let app = this._findHost();
				app.import(asset, options);
			};
		}
	}
};
