Ember.Handlebars.registerBoundHelper('formatDate', function() {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
});