/* eslint-env node */
module.exports = {
	test_page: 'tests/index.html?hidepassed',
	disable_watching: true,
	launch_in_ci: [
		'Chrome'
	],
	launch_in_dev: [
		'Chrome'
	],
	browser_start_timeout: 60,
	browser_disconnect_timeout: 30,
	browser_args: {
		Chrome: [
			'--headless',
			'--disable-gpu',
			'--window-size=1440,900',
			'--remote-debugging-port=9222'
		]
	}
};
