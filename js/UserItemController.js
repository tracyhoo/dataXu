App.UserItemController = Ember.Controller.extend({

    inEditMode: false,

    actions: {

        toggleEditMode: function(){
            this.set('inEditMode', !this.get('inEditMode'));
        },

        saveChange: function(){
            var model = this.get('model');

            if(!model.get('lastName') || !model.get('firstName') || !model.get('email')){
                this.set('hasError', true);
                this.set('errorMessage', "Oh snap! You need to enter all required fields to save.");
                return;
            }

            var date = model.get('createdOn');
            console.log(date);
            console.log(new Date());

            model.set('createdOn', model.get('createdOn'));
            model.set('lastEdited', new Date());
            var self = this;

            model.save().then(function(){
                self.set('inEditMode', false);
            })['catch'](function(e){

            });
        },

        discardChange: function(){
            this.set('inEditMode', false);

            this.get('model').rollback();
        }
    }

});