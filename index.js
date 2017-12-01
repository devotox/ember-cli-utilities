/* eslint-env node */
'use strict';

module.exports = {
	name: 'ember-cli-utilities',

	options: {
		newVersion: true,
		sassOptions: {
			includePaths: [
				'app/styles',
				'addon/styles'
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
		'ember-font-awesome': {
			useScss: true,
			includeFontFiles: true,
			includeFontAwesomeAssets: true
		},
		emberOffline: {
			themes: {
				theme: 'chrome',
				indicator: false,
				language: 'english',
			}
		}
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
