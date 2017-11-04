import { moduleFor, test } from 'ember-qunit';

moduleFor('service:ext-store', 'Unit | Service | ext store', {
	// Specify the other units that are required for this test.
	needs: ['service:crypto', 'service:fastboot']
});

// Replace this with your real tests.
test('it exists', function(assert) {
	let service = this.subject();
	assert.ok(service);
});
