import EmberObject from '@ember/object';
import SetupControllerMixin from 'ember-cli-utilities/mixins/setup-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | setup controller');

// Replace this with your real tests.
test('it works', function(assert) {
	let SetupControllerObject = EmberObject.extend(SetupControllerMixin);
	let subject = SetupControllerObject.create();
	assert.ok(subject);
});
