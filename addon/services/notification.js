const { Offline } = window;

import 'moment-timezone';

import moment from 'moment';

import { get } from '@ember/object';

import Service, { inject } from '@ember/service';

export default class NotificationService extends Service {
	@inject push;
	@inject notifications;
	@inject emberNotificationCenter;

	defaults() {
		let notification = get(this, 'notifications');
		notification.setDefaultClearDuration(3500);
		notification.setDefaultAutoClear(true);
	}

	constructor() {
		super(...arguments);

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
	}

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
			let notification = get(this, 'emberNotificationCenter');
			notification.pushNotification({ title, description }, promise);
		}

		if (type === 'hub' && options.alert) {
			this.hubNotificationMessage(message, options);
		}

		this.callback(promise, options);
	}

	async hubNotificationMessage(message, options) {
		let type = null;
		let error = null;

		if (typeof options.alert === 'string') {
			message = options.alert;
		}

		try {
			await options.action;
			type = 'success';
		} catch(e) {
			// error = e.message;
			type = 'error';
		} finally {
			this.notificationMessage(type, error || message, options);
		}
	}

	notificationMessage(type, message, options = {}) {
		message = !['success', 'error'].includes(type)
			? message
			: type === 'success'
				? `${message} Successful!`
				: `${message} Unsuccessful!`;

		let body = message;
		let { icon = '', title = '', timeout = 5000 } = options;

		return (type === 'system' || options.system)
			&& get(this, 'push').create(title, { icon, body, timeout })
			|| get(this, 'notifications')[type](message, options);
	}

	async callback(promise, options) {
		try {
			let data = await promise;
			options.success && options.success(data);
		} catch(e) { options.failure && options.failure(e);  } finally  { options.callback && options.callback(); }
	}

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
	}

	async promise(type, message) {
		return !['success', 'error'].includes(type)
			? null
			: type === 'success'
				? Promise.resolve(message)
				: Promise.reject(new Error(message));
	}

	description(type, message) {
		return `${message}`;
	}

	title(type, message) {
		let timestamp = `[${moment().format('LTS')}]`;

		return ['success', 'error', 'hub'].includes(type)
			? timestamp : `${timestamp} ${message}`;
	}

	clear() {
		get(this, 'push').clear();
		get(this, 'notifications').clearAll();
	}
}