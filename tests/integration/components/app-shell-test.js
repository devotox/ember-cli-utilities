import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | app-shell', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.set('myAction', function(val) { ... });

		await render(hbs`<AppShell />`);

		assert.equal(this.element.textContent.replace(/\s\s+/g, ' ').trim(), 'Default menu English (US)');

		// Template block usage:
		await render(hbs`
      <AppShell>
        template block text
      </AppShell>
    `);

		assert.equal(this.element.textContent.replace(/\s\s+/g, ' ').trim(), 'Default menu English (US) template block text');
	});
});
