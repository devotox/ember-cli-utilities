import { helper } from '@ember/component/helper';

export function disableBubbling([action]/*, hash*/) {
	return function(event) {
		(event.originalEvent || event).stopImmediatePropagation();
		(event.originalEvent || event).stopPropagation();
		(event.originalEvent || event).preventDefault();
		return action && action(event);
	};
}

export default helper(disableBubbling);
