import { A, isArray } from '@ember/array';

import DS from 'ember-data';

const { Transform } = DS;

export default Transform.extend({
	deserialize(value) {
		return isArray(value) ? A(value) : A();
	},
	serialize(value) {
		return isArray(value) ? A(value) : A();
	}
});
