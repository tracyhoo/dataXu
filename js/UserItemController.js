App.UserItemController = Ember.Controller.extend({

    inEditMode: false,

    actions: {

        toggleEditMode: function(){
            this.set('inEditMode', !this.get('inEditMode'));
        }
    }

});