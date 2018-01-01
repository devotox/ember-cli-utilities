import { moduleFor, test } from 'ember-qunit';

moduleFor('service:api', 'Unit | Service | api', {
	// Specify the other units that are required for this test.
	needs: ['service:utils', 'service:crypto', 'service:offline', 'service:fastboot']
});

// Replace this with your real tests.
test('it exists', function(assert) {
	let service = this.subject();
	assert.ok(service);
});
