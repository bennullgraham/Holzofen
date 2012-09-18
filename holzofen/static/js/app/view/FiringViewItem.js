var rq = [
    'lib/spin',
    'app/SpinnerConfig'
];
define(rq, function(Spinner, SpinnerConfig){

    return Backbone.View.extend({

        tagName: "li",
        className: "firing-view-item",
        id: 'arbitrary',
        viewing: false,

        events: {
            'click'                 : 'view',
            'click .edit .delete'   : 'destroy'
        },

        initialize: function(options) {
            var self = this;
            
            self.model.bind('change', self.render, self);
            self.model.bind('destroy', self.close, self);
        },

        render: function() {
            var self = this;
            var data = self.model.toJSON();
            
            if(typeof data.data_date !== 'undefined') {
                /* I don't think i should be accounting for timezone here, but apparently I need to */
                date_human = new Date(data.data_date - (10 * 60 * 60 * 1000));
                data.duration = self.model.duration();
                data.max_temp = self.model.maxTemp();
                data.data_date_human = date_human.toDateString();
                self.$el.template('firing-view-item', data);
                self.delegateEvents();
            }
            else {
                self.$el.empty();
                var opts = SpinnerConfig['firing-view'];
                new Spinner(opts).spin(self.el);
            }
            return self;
        },

        view: function() {
            var self = this;
            if (!self.viewing) {
                Holzofen.EventBus.trigger('firing:view', self.model.id);
                self.viewing = true;
                self.$el.addClass('active');
            }
        },

        close: function() {
            var self = this;
            if (self.viewing) {
                self.viewing = false;
                self.$el.removeClass('active');
            }
        },

        destroy: function(e) {
            var self = this;
            e.stopPropagation();
            if (confirm("Delete this firing?")) {
                self.model.destroy();
            }
        }
    });
});