App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter;

App.set('hasUnsavedChange', false);

App.Router.map(function() {
    // put your routes here
});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('user');
    },

    setupController: function(controller, model) {
        controller.set('model', model);
    }

});

$(window).on('beforeunload', function () {
    if (App.get('hasUnsavedChange')) {
        return 'You haven\'t saved your changes.';
    }
});