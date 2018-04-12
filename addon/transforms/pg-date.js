import { isNone } from '@ember/utils';

import DS from 'ember-data';

const { Transform } = DS;

export default Transform.extend({
	deserialize(value) {
		return isNone(value) ? null : value.split('T')[0];
	},
	serialize(value) {
		return isNone(value) ? null : value.split('T')[0];
	}
});
