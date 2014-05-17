APP.User = Ember.Model.extend({

	lastName: attr('string'),

	firstName: attr('string'),

	age: attr('number'),

	email: attr('string'),

	createdOn: attr('date'),

	lastEdited: attr('date'),

	active: attr('boolean')

});