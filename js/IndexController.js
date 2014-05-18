App.IndexController = Ember.Controller.extend({

    creatingMode: false,

    hasError: false,

    errorMessage: "",

    newUser: null,

    actions: {

        createUser: function(){
            this.set('creatingMode', true);
            var newUser = this.store.createRecord('user', {});

            this.set('newUser', newUser);
        },

        saveNew: function(){

            var newUser = this.get('newUser');

            if(!newUser.get('lastName') || !newUser.get('firstName') || !newUser.get('email')){
                this.set('hasError', true);
                this.set('errorMessage', "Oh snap! You need to enter all required fields to save.");
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
                    self.set('hasError', true);
                    self.set('errorMessage', "Oh snap! Some unexpected error happened.");
                });
        },

        discardNew: function(){
            var newUser = this.get('newUser');
            newUser.deleteRecord();
            this.set('creatingMode', false);
            this.set('newUser', null);
            this.clearError();
        }
    },

    clearError: function(){
        this.set('hasError', false);
        this.set('errorMessage', "");
    }

});