import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | pg date', function(hooks) {
	setupTest(hooks);

	// Replace this with your real tests.
	test('it exists', function(assert) {
		let transform = this.owner.lookup('transform:pg-date');
		assert.ok(transform);
	});
});
