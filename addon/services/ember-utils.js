import Service from '@ember/service';

import ObjectProxy from '@ember/object/proxy';

import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

export default Service.extend({
	promiseProxy(promise) {
		let ObjectPromiseProxy = ObjectProxy.extend(PromiseProxyMixin);
		return ObjectPromiseProxy.create({ promise });
	}
});
