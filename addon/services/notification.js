const { Offline } = window;

import moment from 'moment';

import { Promise } from 'rsvp';

import Service, { inject } from '@ember/service';

/*
	@Service
	This file handles all notifications from our system

	Functions: { info, alert, error, success, warning, hub }
		- The hub function states you just want the function to go to the notification hub
		- These are functions that can be used to send a message that
		shows up at the top right of the screen and also gets added to the notification hub below
		- These functions take a message and an options hash as arguments
		- Possible options are { alert, hub, title, description, action }
			- Setting alert to false will make sure the notification at the top right does not show
			- Setting hub to false will make sure no notification is added to the notification hub below
			- Title, Description, and Action are for the notification hub.
			This allows us to send a different notification to the hub than the one used in the alert.
			An action (promise) passed in will cause the hub to stay pending till
			the promise rejects or resolves and base its message on that.
			- callbacks that can be passed in options
				- success, failure, callback
				- success will only run on success,
				failure only on errors, and
				callback will always run
 */
export default Service.extend({

	push: inject(),

	notificationCenter: inject('emberNotificationCenter'),

	notificationMessages: inject('notification-messages'),

	init() {
		this._super(...arguments);
		// this.defaults();
		this.setup();
	},

	defaults() {
		let notification = this.get('notificationMessages');
		notification.setDefaultClearDuration(3500);
		notification.setDefaultAutoClear(true);
	},

	setup() {
		[	// Proxy Functions
			'hub',
			'info',
			'warn',
			'alert',
			'error',
			'system',
			'success',
			'warning'
		].forEach((type) => {
			let notifyType;
			notifyType = type === 'alert' ? 'info' : type;
			notifyType = notifyType === 'warn' ? 'warning' : notifyType;
			this[type] = (message,  options) => this.notify(notifyType, message, options);
		});
	},

	async notify(type, message, options = {}) {
		let title = options.title || this.title(type, message);
		let promise = options.action || this.promise(type, message);
		let description = options.description || this.description(type, message);

		if (Offline.state !== 'up' && options.action) {
			return await this.offline(options);
		}

		if (type !== 'hub' && options.alert !== false) {
			this.notificationMessage(type, message, options);
		}

		if (type === 'hub' || options.hub === true) {
			let notification = this.get('notificationCenter');
			notification.pushNotification({ title, description }, promise);
		}

		if (type === 'hub' && options.alert) {
			this.hubNotificationMessage(message, options);
		}

		this.callback(promise, options);
	},

	async hubNotificationMessage(message, options) {
		let type = null;
		let error = null;

		if (typeof options.alert === 'string') {
			message = options.alert;
		}

		try {
			await options.action;
			type = 'success';
		}
		catch(e) {
			// error = e.message;
			type = 'error';
		}
		finally {
			this.notificationMessage(type, error || message, options);
		}
	},

	notificationMessage(type, message, options = {}) {
		message = !['success', 'error'].includes(type)
			? message
			: type === 'success'
				? `${message} Successful!`
				: `${message} Unsuccessful!`;

		let body = message;
		let { icon = '', title = '', timeout = 5000 } = options;

		return (type === 'system' || options.system)
			&& this.get('push').create(title, { icon, body, timeout })
			|| this.get('notificationMessages')[type](message, options);
	},

	async callback(promise, options) {
		try {
			let data = await promise;
			options.success && options.success(data);
		}
		catch(e) { options.failure && options.failure(e);  }
		finally  { options.callback && options.callback(); }
	},

	async offline(options) {
		this.warning('Requests queued and will be reattempted when online!', { hub: false });

		return await new Promise((resolve) => {
			let resolveFlush = () => {
				resolve();
				Offline.off('requests:flush', resolveFlush);
				this.info('Requests sent!', { hub: false });
				return options.callback && options.callback();
			};
			Offline.on('requests:flush', resolveFlush);
		});
	},

	async promise(type, message) {
		return !['success', 'error'].includes(type)
			? null
			: type === 'success'
				? Promise.resolve(message)
				: Promise.reject(new Error(message));
	},

	description(type, message) {
		return `${message}`;
	},

	title(type, message) {
		let timestamp = moment().format('LTS');
		timestamp = `[${timestamp}]`;

		return ['success', 'error', 'hub'].includes(type)
			? timestamp : `${timestamp} ${message}`;
	}
});
