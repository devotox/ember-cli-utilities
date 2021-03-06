import { RequestStrategy } from '@orbit/coordinator';

// Query remote API optimistically
export default {
	create() {
		return new RequestStrategy({
			name: 'store-beforequery-remote-query',

			/**
			 * The name of the source to be observed.
			 */
			source: 'store',

			/**
			 * The name of the event to observe (e.g. `beforeQuery`, `query`,
			 * `beforeUpdate`, `update`, etc.).
			 */
			on: 'beforeQuery',

			/**
			 * The name of the source which will be acted upon.
			 */
			target: 'remote',

			/**
			 * The action to perform on the target.
			 *
			 * Can be specified as a string (e.g. `pull`) or a function which will be
			 * invoked in the context of this strategy (and thus will have access to
			 * both `this.source` and `this.target`).
			 */

			action(transform) {
				const query = this.target.query(transform);

				try {
					const result = this.source.cache.query(transform);
					return result && result.length ? result : query;
				} catch (e) {
					return query;
				}
			},

			/**
			 * A handler for any errors thrown as a result of performing the action.
			 */
			catch (e, transform) {
				console.log('Error performing remote.query()', transform, e); // eslint-disable-line
				this.source.requestQueue.skip(e);
				this.target.requestQueue.skip(e);
				throw e;
			},

			/**
			 * A filter function that returns `true` if the `action` should be performed.
			 *
			 * `filter` will be invoked in the context of this strategy (and thus will
			 * have access to both `this.source` and `this.target`).
			 */
			filter(query) {
				const { options = {} } = query;
				const dataInCache = this.source.cache.query(query);
				const fetchFromRemote = dataInCache.length <= 0 || !options.fromCache;
				return fetchFromRemote;
			},

			/**
			 * Should results returned from calling `action` on the `target` source be
			 * passed as hint data back to the `source`?
			 *
			 * This can allow hints to inform the processing of subsequent actions on the
			 * source. For instance, a `beforeQuery` event might invoke `query` on a
			 * target, and those results could inform how the originating source performs
			 * `_query`. This might allow a target source's sorting and filtering of
			 * results to affect how the originating source processes the query.
			 *
			 * This setting is only effective for `blocking` strategies, since only in
			 * those scenarios is processing delayed.
			 */
			passHints: true,

			/**
			 * Should resolution of the target's `action` invocation block the
			 * completion of the source's `on` event?
			 *
			 * Can be specified as a boolean or a function which which will be
			 * invoked in the context of this strategy (and thus will have access to
			 * both `this.source` and `this.target`).
			 */
			blocking: true // this combined with filter allows us to use cache when available but still get initial load
		});
	}
};
