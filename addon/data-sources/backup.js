import LocalStorageSource from '@orbit/local-storage';
import IndexedDBSource, { supportsIndexedDB } from '@orbit/indexeddb';

export default {
	create(injections = {}) {
		injections.name = 'backup';
		injections.namespace = 'backup-source';

		const SourceClass = supportsIndexedDB
			? IndexedDBSource
			: LocalStorageSource;

		return new SourceClass(injections);
	}
};
