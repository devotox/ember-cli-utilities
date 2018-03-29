import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('transform:uuid', 'Unit | Transform | uuid', function(hooks) {
	setupTest(hooks);

	// Replace this with your real tests.
	test('it exists', function(assert) {
		let transform = this.owner.lookup('transform:uuid');
		assert.ok(transform);
	});
});
