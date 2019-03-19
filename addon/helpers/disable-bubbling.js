import { helper } from '@ember/component/helper';

export function disableBubbling([action]/*, hash*/) {
	return function(event) {
		let _event = event.originalEvent || event;
		_event.stopImmediatePropagation();
		_event.stopPropagation();
		_event.preventDefault();
		
		return action 
			&& action(event);
	};
}

export default helper(disableBubbling);
