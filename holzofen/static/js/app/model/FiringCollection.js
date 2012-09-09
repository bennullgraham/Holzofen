define(['./Firing'], function(Firing) {
    return Backbone.Collection.extend({

        model: Firing,

        url: '/api/1.0/firings',
        
        comparator: function(firing) {
            return firing.get('data_date');
        }

    });
});