/* eslint-env node */
module.exports = {
	parallel: 3,
	disable_watching: true,
	test_page: [
		'tests/index.html?hidepassed&filter=acceptance',
		'tests/index.html?hidepassed&filter=integration',
		'tests/index.html?hidepassed&filter=unit'
	],
	launch_in_ci: [
		'Chrome'
	],
	launch_in_dev: [
		'Chrome'
	],
	browser_start_timeout: 60,
	browser_disconnect_timeout: 60,
	browser_args: {
		Chrome: {
			mode: 'ci',
			args: [
				'--headless',
				'--incognito',
				'--no-sandbox',
				'--disable-gpu',
				'--disable-web-security',
				'--window-size=1440,900',
				'--remote-debugging-port=9222'
			]
		}
	}
};
