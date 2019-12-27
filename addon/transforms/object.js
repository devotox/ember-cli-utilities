import { typeOf } from '@ember/utils';

import Transform from '@ember-data/serializer/transform';

const isObject = (value) => typeOf(value) === 'object';

export default class ObjectTransform extends Transform {
	deserialize(value) {
		return isObject(value) ? value : {};
	}

	serialize(value) {
		return isObject(value) ? value : {};
	}
}
