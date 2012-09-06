define(['./Firing'], function(Firing) {
    return Backbone.Collection.extend({

        model: Firing,

        url: '/api/firings',
        
        comparator: function(firing) {
            return firing.get('title');
        }

    });
});