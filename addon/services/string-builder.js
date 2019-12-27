import Service from '@ember/service';

export default class StringBuilderService extends Service {
	data = [];

	counter = 0;

	create() {
		this.reset();
	}

	append() {
		let data = this.get('data');
		let counter = this.get('counter');
		let args = Array.prototype.slice.call(arguments);

		data[counter + 1] = args.join('').trim();
		this.set('counter', counter + 1);
		this.set('data', data);
	}

	remove(i, j) {
		let data = this.get('data');
		data.splice(i, j || 1);
		this.set('data', data);
	}

	insert(i, s) {
		let data = this.get('data');
		data.splice(i, 0, s);
		this.set('data', data);
	}

	export(s) {
		let data = this.get('data');
		return data.join(s || '');
	}

	reset() {
		this.set('data', []);
		this.set('counter', 0);
	}
}
