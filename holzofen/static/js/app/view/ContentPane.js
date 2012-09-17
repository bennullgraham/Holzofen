rq = [
];
define(rq, function() {

    return Backbone.View.extend({

        childView: null,

        insert: function(view) {
            var self = this;

            if (self.childView && typeof self.childView.close === 'function')
                self.childView.close();

            self.childView = view;
            self.$el.html(self.childView.el);
            self.childView.render();

            return self;
        },

        clear: function() {
            var self = this;

            if (self.childView)
                self.childView.close();
            return self;
        }

    });
});