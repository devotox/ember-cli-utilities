import Service from '@ember/service';

import { get, set } from '@ember/object';

export default class StringBuilderService extends Service {
	data = [];

	counter = 0;

	create() {
		this.reset();
	}

	append() {
		let data = get(this, 'data');
		let counter = get(this, 'counter');
		let args = Array.prototype.slice.call(arguments);

		data[counter + 1] = args.join('').trim();
		set(this, 'counter', counter + 1);
		set(this, 'data', data);
	}

	remove(i, j) {
		let data = get(this, 'data');
		data.splice(i, j || 1);
		set(this, 'data', data);
	}

	insert(i, s) {
		let data = get(this, 'data');
		data.splice(i, 0, s);
		set(this, 'data', data);
	}

	export(s) {
		let data = get(this, 'data');
		return data.join(s || '');
	}

	reset() {
		set(this, 'data', []);
		set(this, 'counter', 0);
	}
}
