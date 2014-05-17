App.User = DS.Model.extend({

	lastName: DS.attr('string'),

	firstName: DS.attr('string'),

	age: DS.attr('number'),

	email: DS.attr('string'),

	createdOn: DS.attr('date'),

	lastEdited: DS.attr('date'),

	active: DS.attr('boolean')

});