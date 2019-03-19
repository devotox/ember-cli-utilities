import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | debounce-action', function(hooks) {
	setupRenderingTest(hooks);

	// Replace this with your real tests.
	test('it renders', async function(assert) {
		this.set('inputValue', '1234');

		await render(hbs`{{debounce-action inputValue}}`);

		const returnedFunction = `function(event) {
			if (isRunning) { return; }

			later(function(){ isRunning = false; }, debounceTime);
			isRunning = !isRunning;
			return action(event);
		}`.replace(/\s/g, '');

		assert.equal(this.element.textContent.replace(/\s/g, ''), returnedFunction);
	});
});
