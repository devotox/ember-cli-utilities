'use strict';

module.exports = {
	plugins: ['stylelint-prettier'],
	extends: [
		'stylelint-config-recommended-scss',
		'stylelint-prettier/recommended'
	],
	rules: {
		'prettier/prettier': true,
		'block-no-empty': null,
		'at-rule-no-unknown': null,
		'property-no-unknown': null,
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['tailwind']
			}
		],
		'no-descending-specificity': [
			null,
			{
				ignore: ['*']
			}
		],
		'unit-whitelist': ['s', 'em', 'rem', 'vw', 'vh', 'px', '%'],
		'selector-type-no-unknown': [
			true,
			{
				ignoreTypes: [/^md-/]
			}
		]
	}
};
