import Service from '@ember/service';

import { get, set } from '@ember/object';

export default class AlphaIteratorService extends Service {
	currentIndex = 0;

	lowercase = true;

	characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	constructor() {
		super(...arguments);
		let lowercase = get(this, 'lowercase');

		let characters = get(this, 'characters');

		lowercase
			&& (characters = characters.toLowerCase())
			|| (characters = characters.toUpperCase());

		set(this, 'characters', characters);
	}

	next() {
		set(this, 'currentIndex', (get(this, 'currentIndex') + 1) % 26);
		return get(this, 'characters').charAt(get(this, 'currentIndex'));
	}

	previous() {
		set(this, 'currentIndex', (get(this, 'currentIndex') - 1) % 26);
		return get(this, 'characters').charAt(get(this, 'currentIndex'));
	}
}
