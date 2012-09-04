define(['./Firing'], function(Firing) {
    return Backbone.Collection.extend({

        model: Firing,

        localStorage: new Store("firings-backbone"),

        comparator: function(firing) {
            return firing.get('date');
        }

    });
});