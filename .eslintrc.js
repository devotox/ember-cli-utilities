module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module'
	},
	plugins: [
		'ember'
	],
	extends: [
		'eslint:recommended',
		'plugin:ember/recommended'
	],
	env: {
		browser: true
	},
	rules: {
		'ember/no-new-mixins': 0,
		'no-var': 'error',
		'no-console': 'off',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'indent': ['error', 'tab'],
		'max-len': ['error', 140 ],
		'no-extra-parens': 'error',
		// 'prettier/prettier': 'error',
		'comma-dangle': ['error', 'never'],
		'arrow-parens': ['error', 'always'],
		'no-cond-assign': ['error', 'always'],
		'no-template-curly-in-string': 'error',
		'object-shorthand': ['error', 'always'],
		'object-curly-spacing': ['error', 'always'],
		'max-statements-per-line': ['error', { 'max': 2 }],
		'new-cap': ['error', { 'capIsNewExceptions': ['A'] }],
		'no-constant-condition': ['error', { 'checkLoops': false }],
		'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
		'generator-star-spacing': ['error', { 'before': false, 'after': true }]
	},
	overrides: [
		// node files
		{
			files: [
				'.eslintrc.js',
				'.template-lintrc.js',
				'ember-cli-build.js',
				'index.js',
				'testem.js',
				'config/**/*.js',
				'tests/dummy/config/**/*.js'
			],
			excludedFiles: [
				'addon/**',
				'addon-test-support/**',
				'app/**',
				'tests/dummy/app/**'
			],
			parserOptions: {
				sourceType: 'script',
				ecmaVersion: 2015
			},
			env: {
				browser: false,
				node: true
			},
			plugins: ['node'],
			rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
				// add your custom rules and overrides for node files here
			})
		}
	]
};
