define(
[
    'lib/spin',
    'app/SpinnerConfig'
],
function(Spinner, SpinnerConfig){

    return Backbone.View.extend({

        tagName: "li",
        events: {
            'click'                 : "view"
        },


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
            
            return self;
        },

        view: function() {
            var self = this;
            Holzofen.EventBus.trigger('content:view', self.model.id);
        }

    });
});