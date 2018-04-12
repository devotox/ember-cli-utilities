import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | new-version', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.set('myAction', function(val) { ... });

		await render(hbs`{{new-version}}`);

		assert.equal(this.element.textContent.trim().replace(/\s+/g, ''), '');

		// Template block usage:
		await render(hbs`
      {{#new-version}}
        template block text
      {{/new-version}}
    `);

		assert.equal(this.element.textContent.trim().replace(/\s+/g, ''), '');
	});
});
