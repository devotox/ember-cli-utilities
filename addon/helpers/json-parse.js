import { helper } from '@ember/component/helper';

export function jsonParse([params]) {
	return JSON.parse(params);
}

export default helper(jsonParse);
