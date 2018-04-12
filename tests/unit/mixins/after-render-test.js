import EmberObject from '@ember/object';
import AfterRenderMixin from 'ember-cli-utilities/mixins/after-render';
import { module, test } from 'qunit';

module('Unit | Mixin | after-render', function() {
	// Replace this with your real tests.
	test('it works', function(assert) {
		let AfterRenderObject = EmberObject.extend(AfterRenderMixin);
		let subject = AfterRenderObject.create();
		assert.ok(subject);
	});
});
