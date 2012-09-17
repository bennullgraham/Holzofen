rq = [
];
define(rq, function() {

    return Backbone.View.extend({

        childView: null,

        insert: function(view) {
            var self = this;

            if (self.childView)
                self.childView.remove();

            self.childView = view;
            self.$el.html(self.childView.el);
            self.childView.render();

            return self;
        },

        remove: function() {
            var self = this;

            if (self.childView)
                self.childView.remove();
            return self;
        }

    });
});