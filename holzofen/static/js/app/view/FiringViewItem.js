var rq = [
    'lib/spin',
    'app/SpinnerConfig'
];
define(rq, function(Spinner, SpinnerConfig){

    return Backbone.View.extend({

        tagName: "li",
        className: "firing-list-item",

        events: {
            //'click'                 : 'activate',
            //'click .edit .delete'   : 'remove'
        },

        initialize: function(options) {
            var self = this;
            
            self.model.bind('change', self.render, self);
            self.model.bind('destroy', self.deactivate, self);

            Holzofen.EventBus.on('firing:view', self.deactivate);
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
                self.$el.template('firing-view', data);
            }
            else {
                self.$el.empty();
                var opts = SpinnerConfig['firing-view'];
                new Spinner(opts).spin(self.el);
            }
            
            // self.delegateEvents();
            // self.$el.on('click', self.activate);
            return self;
        },

        activate: function() {
            var self = this;
            console.dir(self);
            console.log('activating ' + self.model.id);
            Holzofen.EventBus.trigger('firing:view', self.model.id);
            self.$el.addClass('active');
        },

        deactivate: function(unless_id) {
            var self = this;
            if (typeof unless_id === 'undefined' || (typeof self.model !== 'undefined' && unless_id == self.model.id)) {
                self.$el.removeClass('active');
            }
        },

        remove: function() {
            var self = this;
            if (confirm("Delete this firing?")) {
                self.model.destroy();
                self.remove();
            }
        }
    });
});