App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter;

App.Router.map(function() {
    // put your routes here
});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('user');
    },

    setupController: function(controller, model) {
        controller.set('model', model);
        controller.set("title", "hello");
    }
});
