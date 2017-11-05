import Service from '@ember/service';

export default Service.extend({
	data: [],

	counter: 0,

	create() {
		this.reset();
	},

	append() {
		let data = this.get('data');
		let counter = this.get('counter');
		let args = Array.prototype.slice.call(arguments);

		data[counter + 1] = args.join('').trim();
		this.set('counter', counter + 1);
		this.set('data', data);
	},

	remove(i, j) {
		let data = this.get('data');
		data.splice(i, j || 1);
		this.set('data', data);
	},

	insert(i, s) {
		let data = this.get('data');
		data.splice(i, 0, s);
		this.set('data', data);
	},

	export(s) {
		let data = this.get('data');
		return data.join(s || '');
	},

	reset() {
		this.set('data', []);
		this.set('counter', 0);
	}
});

/*
exports.string_builder = function() {
	this.data = [];
	this.counter = 0;

	// adds string s to the stringbuilder
	this.append = function () {
		let args = Array.prototype.slice.call(arguments);
		this.data[this.counter++] = args.join('').trim(); return this;
	};
	// removes j elements starting at i, or 1 if j is omitted
	this.remove = function (i, j) { this.data.splice(i, j || 1); return this; };
	// inserts string s at i
	this.insert = function (i, s) { this.data.splice(i, 0, s); return this; };
	// builds the string
	this.toString = function (s) { return this.data.join(s || ''); };

	return this;
}.bind({});
 */
