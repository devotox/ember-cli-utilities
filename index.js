/* eslint-env node */
'use strict';

module.exports = {
	name: 'ember-cli-utilities',

	included(app) {
		this._super.included.apply(this, arguments);
		!app.sassOptions
			&& (app.sassOptions = { includePaths: [] });

		app.sassOptions.includePaths.push('app/styles');
		app.sassOptions.includePaths.push('addon/styles');
	},

	options: {
		sassOptions: {
			includePaths: [
				'app/styles',
				'addon/styles'
			]
		},
		babel: {
			plugins: ['transform-object-rest-spread']
		},
		'ember-cli-babel': {
			compileModules: true,
			includePolyfill: true,
			disableDebugTooling: true
		},
	}
};
