import Service from '@ember/service';

export default Service.extend({
	logLevel: 'debug',

	init() {
		this._super(...arguments);
		this.setup();
	},

	setup() {
		[
			'info',
			'warn',
			'error',
			'debug',
			'assert'
		].forEach((type) => {
			this[type] = (key, value, from) => this._log(type, key, value, from);
		});
	},

	_log(level, key, value, from = 'Unknown') {
		console[level](`[${from}]`, `${key}:`, value);
	},

	log() {
		let logLevel = this.get('logLevel');
		this._log(logLevel, ...arguments);
	},

	error(error, noThrow, from) {
		this._log('error', 'Error', error, from);
		if (noThrow !== false) { throw error; }
	}
});