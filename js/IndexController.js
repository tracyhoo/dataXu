App.IndexController = Ember.Controller.extend({

    creatingMode: false,

    hasError: false,

    errorMessage: "",

    newUser: null,

    sortBy: "lastName",

    hasNewChange: false,

    sortByLastName: function(){
        return this.get('sortBy') === 'lastName';
    }.property('sortBy'),
    sortByFirstName: function(){
        return this.get('sortBy') === 'firstName';
    }.property('sortBy'),
    sortByAge: function(){
        return this.get('sortBy') === 'age';
    }.property('sortBy'),
    sortByEmail: function(){
        return this.get('sortBy') === 'email';
    }.property('sortBy'),
    sortByCreatedOn: function(){
        return this.get('sortBy') === 'createdOn';
    }.property('sortBy'),
    sortByLastEdited: function(){
        return this.get('sortBy') === 'lastEdited';
    }.property('sortBy'),
    sortByActive: function(){
        return this.get('sortBy') === 'active';
    }.property('sortBy'),

    onUnsavedChange: function(){
        var hasUnsavedChild = this.get('model').any(function(u){
            return u.get('isDirty');
        });
        if(hasUnsavedChild || this.get('hasNewChange')){
            App.set('hasUnsavedChange', true);
        }else{
            App.set('hasUnsavedChange', false);
        }
    }.observes('model.@each.isDirty', 'hasNewChange'),

    actions: {

        onError: function(errorMessage){
            this.setError(errorMessage);
        },

        onClearError: function(){
            this.clearError();
        },


        createUser: function(){
            this.set('creatingMode', true);
            var newUser = this.store.createRecord('user', {});

            this.set('newUser', newUser);
            this.set('hasNewChange', true);
        },

        saveNew: function(){

            var newUser = this.get('newUser');

            if(!newUser.get('lastName') || !newUser.get('firstName') || !newUser.get('email')){
                this.setError("Oh snap! You need to enter all required fields to save.");
                return;
            }

            var self = this;

            newUser.set('createdOn', new Date());
            newUser.set('lastEdited', new Date());

            newUser.save().then(
                function(){
                    self.set('creatingMode', false);
                    self.set('newUser', null);
                    self.clearError();
                })
                ['catch'](function(e){
                    self.setError("Oh snap! Some unexpected error happened.");
                });

            this.set('hasNewChange', false);
        },

        discardNew: function(){
            var newUser = this.get('newUser');
            newUser.deleteRecord();
            this.set('creatingMode', false);
            this.set('newUser', null);
            this.clearError();
            this.set('hasNewChange', false);
        },

        sortBy: function(sortBy){
            var model = this.get('model');
            model = model.sortBy(sortBy);
            this.set('model', model);
            this.set('sortBy', sortBy);
        }
    },

    setError: function(errorMessage){
        this.set('hasError', true);
        this.set('errorMessage', errorMessage);
    },

    clearError: function(){
        this.set('hasError', false);
        this.set('errorMessage', "");
    }

});