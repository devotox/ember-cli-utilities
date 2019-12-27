import { isNone } from '@ember/utils';

import Transform from '@ember-data/serializer/transform';

export default class PgDateTransform extends Transform {
	deserialize(value) {
		return isNone(value) ? null : value.split('T')[0];
	}

	serialize(value) {
		return isNone(value) ? null : value.split('T')[0];
	}
}
