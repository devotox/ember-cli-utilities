/* eslint-env node */
module.exports = {
	framework: 'qunit',
	test_page: [
		'tests/index.html?hidepassed&filter=acceptance',
		'tests/index.html?hidepassed&filter=integration',
		'tests/index.html?hidepassed&filter=unit'
	],
	parallel: 3,
	disable_watching: true,
	launch_in_ci: [
		'Chrome'
	],
	launch_in_dev: [
		'Chrome'
	],
	browser_start_timeout: 1200,
	browser_disconnect_timeout: 1200,
	browser_args: {
		Chrome: [
			'--headless',
			'--incognito',
			'--no-sandbox',
			'--disable-gpu',
			'--disable-web-security',
			'--window-size=1440,900',
			'--remote-debugging-port=9222'
		]
	}
};
