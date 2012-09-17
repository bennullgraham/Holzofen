rq = [
    'lib/spin',
    'app/SpinnerConfig',
    'lib/jquery.flot',
    'lib/jquery.flot.time',
    'lib/jquery.flot.tooltip'
];
define(rq, function(Spinner, SpinnerConfig){
    return Backbone.View.extend({

        tagName: 'div',
        className: 'firing-view-full',
        plotOpts: {
            xaxis: {
                mode: "time",
                timeformat: "%a %H:%M"
            },
            grid: {
                backgroundColor: '#f9f9f9',
                hoverable: true,
                borderWidth: 1,
                borderColor: 0
            },
            colors: ['#0A5575', '#BA8008', '#BA4008'],
            tooltip: true,
            tooltipOpts: {
                dateFormat: "%s: %y&deg;c"
            }
        },

        initialize: function() {
            var self = this;
            $(window).on("resize.app", _.bind(self.render, self));
            self.model.bind('change:data', self.render, self);
        },

        render: function() {
            var self = this;
            var data = self.model.toJSON();

            if(typeof data.data !== 'undefined') {
                if (self.$el.closest('body').length > 0) {
                    console.log('doing render');
                    self.$el.template('plot-view', {}, function(){
                        var placeholder = self.$('.plot-placeholder');
                        console.dir(placeholder);
                        $.plot(placeholder, data.data, self.plotOpts);
                    });
                }
                else {
                    console.log('skipping render, not in DOM?');
                }
            }
            else {
                // only load in plot data now, when definitely necessary.
                self.model.fetch();
                var opts = SpinnerConfig['plot-view'];
                new Spinner(opts).spin(self.el);
            }
            return self;
        },

        remove: function() {
            var self = this;
            Holzofen.EventBus.trigger('firing:close', self.model.id);
            $(window).off("resize.app");
            Backbone.View.prototype.remove.call(self);
        }

    });
});