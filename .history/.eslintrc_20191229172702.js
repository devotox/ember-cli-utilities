module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			legacyDecorators: true
		}
	},
	plugins: [
		'json',
		'ember'
	],
	extends: [
		'eslint:recommended',
		'plugin:ember/recommended',
		'plugin:json/recommended-with-comments'
	],
	env: {
		browser: true
	},
	rules: {
		'ember/no-jquery': 'error',
		'ember/no-new-mixins': 0,
		'no-var': 'error',
		'no-console': 'off',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'indent': ['error', 'tab'],
		'max-len': ['error', 140],
		'no-extra-parens': 'error',
		'comma-dangle': ['error', 'never'],
		'arrow-parens': ['error', 'always'],
		'no-cond-assign': ['error', 'always'],
		'no-template-curly-in-string': 'error',
		'object-shorthand': ['error', 'always'],
		'object-curly-spacing': ['error', 'always'],
		'max-statements-per-line': ['error', { 'max': 2 }],
		'new-cap': ['error', { 'capIsNewExceptions': ['A'] }],
		'no-constant-condition': ['error', { 'checkLoops': false }],
		'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
		'generator-star-spacing': ['error', { 'before': false, 'after': true }]
	},
	overrides: [
		// node files
		{
			files: [
				'.huskyrc.js',
				'.eslintrc.js',
				'.ember-cli.js',
				'postcss.config.js',
				'.template-lintrc.js',
				'stylelint.config.js',
				'ember-cli-build.js',
				'testem.js',
				'testem-electron.js',
				'blueprints/*/index.js',
				'config/**/*.js',
				'lib/*/index.js',
				'server/**/*.js',
				'functions/**/*.js',
				'app/tailwind/*.js'
			],
			excludedFiles: [
				'addon/**',
				'addon-test-support/**',
				'app/**',
				'tests/dummy/app/**'
			],
			parserOptions: {
				sourceType: 'script'
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
