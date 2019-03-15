import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | locale-select', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.set('myAction', function(val) { ... });

		await render(hbs`{{locale-select}}`);

		assert.equal(this.element.textContent.trim().replace(/\s+/g, ''), 'English(US)');

		// Template block usage:
		await render(hbs`
      {{#locale-select}}
        template block text
      {{/locale-select}}
    `);

		assert.equal(this.element.textContent.trim().replace(/\s+/g, ''), 'English(US)');
	});
});
