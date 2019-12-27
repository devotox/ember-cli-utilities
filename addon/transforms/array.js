import { A, isArray } from '@ember/array';

import Transform from '@ember-data/serializer/transform';

export default class ArrayTransform extends Transform {
	deserialize(value) {
		return isArray(value) ? A(value) : A();
	}

	serialize(value) {
		return isArray(value) ? A(value) : A();
	}
}
