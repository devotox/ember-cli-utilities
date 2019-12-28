'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const isProduction = EmberAddon.env() === 'production';
const isTesting = EmberAddon.env() === 'test';
const isDevelopment = !isProduction;

console.info('ENVIRONMENT:', EmberAddon.env()); // eslint-disable-line

const origin = '';

module.exports = function(defaults) {
	let app = new EmberAddon(defaults, {
		origin,
		'tests': isTesting,
		'hinting': isTesting,
		'storeConfigInMeta': isDevelopment,

		'ember-fetch': {
			preferNative: true
		},
		'ember-welcome-page': {
			enabled: false
		},
		'sassOptions': {
			includePaths: [
				'app/styles',
				'node_modules/tailwindcss/dist',
				'node_modules/ember-paper/app/styles',
				'node_modules/ember-cli-utilities/app/styles'
			]
		},
		'SRI': {
			origin,
			enabled: false
		},
		'fingerprint': {
			prepend: origin,
			enabled: false, // isProduction - breaks ember cli amp
			extensions: ['js', 'css', 'map', 'webmanifest'],
			exclude: [
				'waveWorker.min.js',
				'engine.js', 'engine.css',
				'engine-vendor.js', 'engine-vendor.css'
			]
		},
		'autoprefixer': {
			enabled: isProduction
		},
		'minifyJS': {
			enabled: isProduction
		},
		'minifyCSS': {
			enabled: false
		},
		'minifyHTML': {
			enabled: isProduction,
			htmlFiles: ['index.html'] // index.amp.html - breaks production build because brotli cannot find it
		},
		'sourcemaps': {
			compileModules: true,
			enabled: isProduction,
			extensions: ['js', 'css', 'scss']
		},
		'ember-cli-babel': {
			compileModules: true,
			disableDebugTooling: true,
			includeExternalHelpers: true,
			includePolyfill: isProduction,
			throwUnlessParallelizable: false
		},
		'babel': {
			plugins: [
				'@babel/plugin-proposal-throw-expressions',
				'@babel/plugin-proposal-optional-chaining',
				'@babel/plugin-proposal-object-rest-spread',
				'@babel/plugin-proposal-export-namespace-from',
				'@babel/plugin-proposal-nullish-coalescing-operator',
				'@babel/plugin-proposal-logical-assignment-operators',
				[
					'@babel/plugin-proposal-pipeline-operator',
					{ proposal: 'minimal' }
				]
			]
		}
	});

	/*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

	return app.toTree();
};
