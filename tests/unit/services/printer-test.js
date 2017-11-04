import { moduleFor, test } from 'ember-qunit';

moduleFor('service:printer', 'Unit | Service | printer', {
	// Specify the other units that are required for this test.
	needs: ['service:notification']
});

// Replace this with your real tests.
test('it exists', function(assert) {
	let service = this.subject();
	assert.ok(service);
});
