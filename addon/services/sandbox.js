import { Promise } from 'rsvp';

import Service from '@ember/service';

const needsWindow = ['setTimeout', 'setInterval'];

const { WeakMap, Proxy, Symbol, console } = window;

const get = (target, key) => {
	return key !== Symbol.unscopables
		&& needsWindow.includes(key)
		? target[key].bind(window)
		: target[key];
};

const has = () => true;

export default Service.extend({

	sandboxes: new WeakMap(), // eslint-disable-line

	globals: { // eslint-disable-line
		console,
		Object, Promise,
		parseInt, parseFloat,
		setTimeout, setInterval
	},

	getSandboxKey(context) {
		return context;
		// return JSON.stringify(Object.keys(context));
	},
	createSandbox(globals) {
		let defaultGlobals = this.get('globals');
		return !globals
			? defaultGlobals
			: Object.assign(globals, defaultGlobals);
	},
	compileCode(src, root = {}) {
		src = `with (context) { ${src} }`;
		let sandboxes = this.get('sandboxes');
		let code = new Function('context', src);

		return (context) => {
			let sandboxKey = this.getSandboxKey(context);

			if (!sandboxes.has(sandboxKey)) {
				let global = Object.assign(Object.create(null), root);
				let proxy = new Proxy(context, { has, get });
				sandboxes.set(sandboxKey, { proxy, global });
			}

			let { proxy, global } = sandboxes.get(sandboxKey);
			return code.call(global, proxy);
		};
	},
	runCode(src, globals, root) {
		let sandbox = this.createSandbox(globals);
		let code = this.compileCode(src, root);
		return code(sandbox);
	}
});
