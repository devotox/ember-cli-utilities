import Service from '@ember/service';

import Ember from 'ember';

const { Logger } = Ember;

export default Service.extend({
	logLevel: 'debug',

	_log(level, key, value, from = 'Unknown') {
		Logger[level](`[${from}]`, `${key}:`, value);
	},

	log() {
		let logLevel = this.get('logLevel');
		this._log(logLevel, ...arguments);
	},

	error(error, noThrow, from) {
		this._log('error', 'Error', error, from);
		if (noThrow !== false) { throw error; }
	},

	init() {
		this._super(...arguments);
		this.setup();
	},

	setup() {
		[
			'info',
			'warn',
			'debug',
			'assert'
		].forEach((type) => {
			this[type] = (key, value, from) => this._log(type, key, value, from);
		});
	}

});
