import { RequestStrategy } from '@orbit/coordinator';
import { NetworkError } from '@orbit/data';

export default {
	create() {
		return new RequestStrategy({
			name: 'remote-updatefail',

			/**
			 * The name of the source to be observed.
			 */
			source: 'remote',

			/**
			 * The name of the event to observe (e.g. `beforeQuery`, `query`,
			 * `beforeUpdate`, `update`, etc.).
			 */
			on: 'updateFail',

			/**
			 * The name of the source which will be acted upon.
			 */
			// target: 'TODO',

			/**
			 * The action to perform on the target.
			 *
			 * Can be specified as a string (e.g. `pull`) or a function which will be
			 * invoked in the context of this strategy (and thus will have access to
			 * both `this.source` and `this.target`).
			 */
			action(transform, e) {
				const remote = this.source;
				const store = this.coordinator.getSource('store');

				if (e instanceof NetworkError) {
					// When network errors are encountered, try again in 3s
					console.log('NetworkError - will try again soon'); // eslint-disable-line
					setTimeout(() => {
						remote.requestQueue.retry();
					}, 3000);
				}
				else {
					// When non-network errors occur, notify the user and
					// reset state.
					const label = transform.options && transform.options.label;
					if (label) {
						alert(`Unable to complete "${label}"`);
					}
					else {
						alert('Unable to complete operation');
					}

					// Roll back store to position before transform
					if (store.transformLog.contains(transform.id)) {
						console.log('Rolling back - transform:', transform.id); // eslint-disable-line
						store.rollback(transform.id, -1);
					}

					return remote.requestQueue.skip();
				}
			},

			/**
			 * A handler for any errors thrown as a result of performing the action.
			 */
			// catch(e) {},

			/**
			 * A filter function that returns `true` if the `action` should be performed.
			 *
			 * `filter` will be invoked in the context of this strategy (and thus will
			 * have access to both `this.source` and `this.target`).
			 */
			// filter(...args) {};

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
			blocking: false
		});
	}
};

