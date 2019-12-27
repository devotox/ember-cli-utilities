import Transform from '@ember-data/serializer/transform';

const isUUID = (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export default class UuidTransform extends Transform {
	deserialize(value) {
		return isUUID(value) ? value : null;
	}

	serialize(value) {
		return isUUID(value) ? value : null;
	}
}
