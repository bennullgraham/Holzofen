rq = [
    '../model/FiringCollection',
    './FiringView',
    '../template'
];
define(rq, function(FiringCollection, FiringView) {

    var Firings = new FiringCollection;

    var HolzofenView = Backbone.View.extend({

        el: $('#HolzofenApp'),
        
        events: {
            'keypress #new-firing'        : 'createOnEnter'
        },

        initialize: function() {
            var self = this;
            $(this.el).template('holzofen-app', {}, function() {
                self.input = self.$("#new-firing");
                Firings.bind('add', self.addOne, self);
                Firings.bind('reset', self.addAll, self);
                Firings.bind('all', self.render, self);
                Firings.fetch();
            });
        },

        render: function() {
            // ...
        },

        addOne: function (firing) {
            var view = new FiringView({model: firing});
            this.$('#firing-list').append(view.render().el);
        },

        addAll: function () {
            Firings.each(this.addOne);
        },

        createOnEnter: function(e) {
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;

            Firings.create({data: this.input.val()});
            this.input.val('');
        }

    });

    var H = new HolzofenView;   
    return H;
});