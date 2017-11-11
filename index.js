/* eslint-env node */
'use strict';

module.exports = {
	name: 'ember-cli-utilities',

	included() {
		this._super.included.apply(this, arguments);
	},

	options: {
		sassOptions: {
			includePaths: ['addon/styles']
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
