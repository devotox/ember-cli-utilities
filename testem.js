/* eslint-env node */
module.exports = {
	test_page: [
		'tests/index.html?hidepassed&filter=acceptance',
		'tests/index.html?hidepassed&filter=integration',
		'tests/index.html?hidepassed&filter=unit'
	],
	parallel: -1,
	disable_watching: true,
	launch_in_ci: [
		'Chrome'
	],
	launch_in_dev: [
		'Chrome'
	],
	browser_start_timeout: 120,
	browser_disconnect_timeout: 120,
	browser_args: {
		Chrome: [
			'--headless',
			'--disable-gpu',
			'--window-size=1440,900',
			'--remote-debugging-port=9222'
		]
	}
};
