import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | object', function(hooks) {
	setupTest(hooks);

	// Replace this with your real tests.
	test('it exists', function(assert) {
		let transform = this.owner.lookup('transform:object');
		assert.ok(transform);
	});
});
