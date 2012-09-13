var rq = [
    'app/view/PlotView',
    'lib/spin',
    'app/SpinnerConfig'
];
define(rq, function(PlotView, Spinner, SpinnerConfig){

    return Backbone.View.extend({

        tagName: "li",
        className: "firing-list-item",

        events: {
            'click'                 : "view",
            'keypress .edit'        : "updateOnEnter",
            'blur .edit'            : "close",
            'click .edit .delete'   : "delete"
        },

        initialize: function(options) {
            var self = this;

            self.model.bind('change', self.render, self);
            self.model.bind('destroy', self.close, self);
            //self.model.fetch();
            self.PlotView = new PlotView({model: self.model});

            Application.EventBus.on('firing:view', function(id) {
                if (id!==self.model.id)
                    self.close();
            });
        },

        render: function() {
            var self = this;
            var data = self.model.toJSON();
            
            if(typeof data['data_date'] !== 'undefined') {
                /* I don't think i should be accounting for timezone here, but apparently I need to */
                date_human = new Date(data['data_date'] - (10 * 60 * 60 * 1000));
                data['duration'] = self.model.duration();
                data['max_temp'] = self.model.maxTemp();
                data['data_date_human'] = date_human.toDateString();
                self.$el.template('firing-view', data, function(){});
            }
            else {
                self.$el.empty();
                var opts = SpinnerConfig['firing-view'];
                new Spinner(opts).spin(self.el);
            }
            return self;
        },

        view: function() {
            Application.EventBus.trigger('firing:view', this.model.id);
            this.PlotView.view();
            $(this.el).addClass('active');
        },

        close: function() {
            this.PlotView.close();
            $(this.el).removeClass('active');
        },

        updateOnEnter: function(e) {
            if (e.keyCode == 13)
                this.close();
        },

        delete: function(e) {
            if (confirm("Delete this firing?")) {
                this.model.destroy();
                this.remove();
            }
        }
    });
});