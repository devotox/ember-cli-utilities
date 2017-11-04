import { run } from '@ember/runloop';

import Mixin from '@ember/object/mixin';

// Can only be used in components
export default Mixin.create({
	afterRender() {},

	// This hook is guaranteed to be executed
	// when the root element  of this view has been inserted into the DOM.
	didInsertElement() {
		this._super(...arguments);
		run.scheduleOnce('afterRender', this, this.afterRender);
	}
});
