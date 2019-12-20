import BucketClass from '@orbit/indexeddb-bucket';

export default {
	create(injections = {}) {
		injections.name = 'main';
		injections.namespace = 'main-bucket';

		return new BucketClass(injections);
	}
};
