var rq = [
    'app/model/Content',
    'lib/spin',
    'app/SpinnerConfig'
];
define(rq, function(Content, Spinner, SpinnerConfig){

    return Backbone.View.extend({

        tagName: "li",
        events: {
            'click': 'view'
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
                self.$el.template('content-view', data);
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
                $el = $('#content-pane');

            self.viewing = true;
            self.model.fetch();

            if(typeof data.content !== 'undefined') {
                $el.html(data.content);
            }
            else {
                $el.empty();
                var opts = SpinnerConfig['content-view'];
                new Spinner(opts).spin($el);
            }
        },

        close: function() {
            self.viewing = false;
        }
    });
});