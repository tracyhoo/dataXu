App.UserItemController = Ember.Controller.extend({

    inEditMode: false,

    actions: {

        toggleEditMode: function(){
            this.set('inEditMode', !this.get('inEditMode'));
        },

        saveChange: function(){
            var model = this.get('model');

            //field check: lastName, firstName and email cannot be empty
            if(!model.get('lastName') || !model.get('firstName') || !model.get('email')){
                this.get('parentController').send('onError', "Oh snap! You need to enter all required fields to save.");
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
                self.get('parentController').send('onError', "Oh snap! Some unexpected error happened.");
            });
        },

        discardChange: function(){
            //exit edit mode and roll back model
            this.set('inEditMode', false);
            this.get('model').rollback();

            this.get('parentController').send('onClearError');
        }
    }

});