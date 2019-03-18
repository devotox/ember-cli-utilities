import { helper } from '@ember/component/helper';

export function disableBubbling([action]/*, hash*/) {
	return function(event) {
		event.stopImmediatePropagation();
		event.stopPropagation();
		event.preventDefault();
		return action(event);
	};
}

export default helper(disableBubbling);
