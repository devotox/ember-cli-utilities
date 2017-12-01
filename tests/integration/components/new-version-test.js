import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('new-version', 'Integration | Component | new version', {
	integration: true
});

test('it renders', function(assert) {
	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	this.render(hbs`{{new-version}}`);

	assert.equal(this.$().text().trim(), '');

	// Template block usage:
	this.render(hbs`
    {{#new-version}}
      template block text
    {{/new-version}}
  `);

	assert.equal(this.$().text().trim(), 'template block text');
});
