rq = [
];
define(function(PlotData){

    return Backbone.Model.extend({

        remove: function() {
            this.destroy();
        },

    });
    
});