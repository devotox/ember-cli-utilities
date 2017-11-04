import Service from '@ember/service';

export default Service.extend({
	currentIndex: 0,

	lowercase: true,

	characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',

	init() {
		this._super(...arguments);
		this.setup();
	},

	setup() {
		let lowercase = this.get('lowercase');

		let characters = this.get('characters');

		lowercase
			&& (characters = characters.toLowerCase())
			|| (characters = characters.toUpperCase());

		this.set('characters', characters);
	},

	next() {
		this.set('currentIndex', (this.get('currentIndex') + 1) % 26);
		return this.get('characters').charAt(this.get('currentIndex'));
	},

	previous() {
		this.set('currentIndex', (this.get('currentIndex') - 1) % 26);
		return this.get('characters').charAt(this.get('currentIndex'));
	}
});
