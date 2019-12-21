// reads addon config stored in meta element
function readAddonConfig(appInstance) {
	const config = appInstance.resolveRegistration('config:environment');
	const addonConfig = config['ember-cli-content-security-policy'];
	return addonConfig;
}

export function initialize(appInstance) {
	const fastboot = appInstance.lookup('service:fastboot');

	if (!fastboot || !fastboot.get('isFastBoot')) {
		// nothing to do if application does not run in FastBoot or
		// does not even have a FastBoot service
		return;
	}

	const { policy, reportOnly } = readAddonConfig(appInstance);
	const header = reportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy';
	fastboot.get('response.headers').set(header, policy);
}

export default {
	initialize
};
