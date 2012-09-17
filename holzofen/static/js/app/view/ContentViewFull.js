rq = [
    'lib/spin',
    'app/SpinnerConfig'
];
define(rq, function(Spinner, SpinnerConfig){

    return Backbone.View.extend({

        tagName: 'div',
        className: 'content-view-full',
        
        initialize: function() {
            var self = this;
            self.model.bind('change:content', self.render, self);
        },

        render: function() {
            var self = this;
            var data = self.model.toJSON();

            if(typeof data.content !== 'undefined') {
                self.$el.template('content-view-full', data);
            }
            else {
                self.model.fetch();
                var opts = SpinnerConfig['content-view-full'];
                new Spinner(opts).spin(self.el);
            }
            return self;
        },

        close: function() {
            // ...
        }
    });
});