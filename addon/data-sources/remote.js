import fetch from 'fetch';

import Orbit from '@orbit/data';

import SourceClass from '@orbit/jsonapi';
// https://github.com/orbitjs/ember-orbit/issues/166#issuecomment-444888867 - Authentication?

export default {
	create(injections = {}) {
		Orbit.fetch = fetch;

		injections.name = 'remote';
		injections.namespace = 'api';
		return new SourceClass(injections);
	}
};
