import Service, { inject } from '@ember/service';

export default Service.extend({
	notification: inject(),

	print(_class) {
		console.log(_class);
		this.get('notification').warning('Not Yet Supported!', {
			hub: false
		});
	}
});
