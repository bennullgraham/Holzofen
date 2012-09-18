define(
[],
function(){

    return Backbone.Model.extend({

        remove: function() {
            this.destroy();
        }

    });

});