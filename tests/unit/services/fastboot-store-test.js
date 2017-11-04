import { moduleFor, test } from 'ember-qunit';

moduleFor('service:fastboot-store', 'Unit | Service | fastboot store', {
	// Specify the other units that are required for this test.
	needs: ['service:fastboot']
});

// Replace this with your real tests.
test('it exists', function(assert) {
	let service = this.subject();
	assert.ok(service);
});
