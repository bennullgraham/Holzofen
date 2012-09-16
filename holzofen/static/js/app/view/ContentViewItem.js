var rq = [
    'lib/spin',
    'app/SpinnerConfig'
];
define(rq, function(Spinner, SpinnerConfig){

    return Backbone.View.extend({

        tagName: "li",
        events: {
            'click'                 : "view"
        },
        viewing: false,

        initialize: function(options) {
            var self = this;
            self.model.bind('change', self.render, self);
        },

        render: function() {
            var self = this;
            var data = self.model.toJSON();
            
            if(typeof data.title !== 'undefined') {
                self.$el.template('content-view-item', data);
                self.delegateEvents();
            }
            else {
                self.$el.empty();
                var opts = SpinnerConfig['content-view'];
                new Spinner(opts).spin(self.el);
            }
            if (self.viewing)
                self.view();
            
            return self;
        },

        view: function() {
            var self = this,
                data = self.model.toJSON(),
                $pane = $('#content-pane');

            self.viewing = true;
            self.model.fetch();

            if(typeof data.content !== 'undefined') {
                $pane.html(data.content);
            }
            else {
                $pane.empty();
                var opts = SpinnerConfig['content-view'];
                new Spinner(opts).spin($pane);
            }
        },

        close: function() {
            self.viewing = false;
        }
    });
});