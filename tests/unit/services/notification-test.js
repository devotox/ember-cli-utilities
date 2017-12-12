import { moduleFor, test } from 'ember-qunit';

moduleFor('service:notification', 'Unit | Service | notification', {
	// Specify the other units that are required for this test.
	needs: [
		'service:push',
		'service:emberNotificationCenter',
		'service:notification-messages-service'
	]
});

// Replace this with your real tests.
test('it exists', function(assert) {
	let service = this.subject();
	assert.ok(service);
});
