import Service from '@ember/service';

import { get } from '@ember/object';

export default class LoggerService extends Service {
	logLevel = 'debug';
	
	constructor() {
		super(...arguments);
		
		[
			'info',
			'warn',
			'error',
			'debug',
			'assert'
		].forEach((type) => {
			this[type] = (key, value, from) => this._log(type, key, value, from);
		});
	}

	_log(level, key, value, from = 'Unknown') {
		console[level](`[${from}]`, `${key}:`, value);
	}

	log() {
		let logLevel = get(this, 'logLevel');
		this._log(logLevel, ...arguments);
	}

	error(error, noThrow, from) {
		this._log('error', 'Error', error, from);
		if (noThrow !== false) { throw error; }
	}
}
