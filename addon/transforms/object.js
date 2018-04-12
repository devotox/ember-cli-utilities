import { typeOf } from '@ember/utils';

import DS from 'ember-data';

const { Transform } = DS;

const isObject = (value) => typeOf(value) === 'object';

export default Transform.extend({
	deserialize(value) {
		return isObject(value) ? value : {};
	},
	serialize(value) {
		return isObject(value) ? value : {};
	}
});
