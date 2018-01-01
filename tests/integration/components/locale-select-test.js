import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('locale-select', 'Integration | Component | locale select', {
	integration: true
});

test('it renders', function(assert) {
	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	this.render(hbs`{{locale-select}}`);

	assert.equal(this.$().text().trim(), 'en');

	// Template block usage:
	this.render(hbs`
    {{#locale-select}}
      template block text
    {{/locale-select}}
  `);

	assert.equal(this.$().text().trim(), 'en');
});
