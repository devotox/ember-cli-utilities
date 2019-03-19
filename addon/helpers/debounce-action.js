import { later } from '@ember/runloop';

import { helper } from '@ember/component/helper';

export function debounceAction([action, debounceTime=300] /* , hash*/) {
	let isRunning = false;

	return function(event) {
		if (isRunning) { return; }

		later(() => isRunning = false, debounceTime);
		isRunning = !isRunning;
		return action(event);
	};
}

export default helper(debounceAction);
