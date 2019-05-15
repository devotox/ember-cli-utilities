import { helper } from '@ember/component/helper';

export function jsonStringify(params, { replacer = null, spaces = 4}) {
  return JSON.stringify(params, replacer, spaces);
}

export default helper(jsonStringify);
