import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('notification-center', 'Integration | Component | notification center', {
	integration: true
});

test('it renders', function(assert) {
	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	this.render(hbs`{{notification-center}}`);

	assert.equal(this.$().text().trim(), '');

	// Template block usage:
	this.render(hbs`
    {{#notification-center}}
      template block text
    {{/notification-center}}
  `);

	assert.equal(this.$().text().trim(), 'template block text');
});
