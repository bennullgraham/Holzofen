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
        className: 'plot-view',
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

        render: function() {
            var self = this;
            var data = self.model.toJSON();

            // don't render if this view is not in the DOM
            if (self.$el.context.parentElement === null) {
                return self;
            }
            if(typeof data['data'] !== 'undefined') {
                self.$el.template('plot-view', {}, function(){
                    var plotPlaceholder = $('.plot-placeholder', self.$el);
                    $.plot(plotPlaceholder, data['data'], self.plotOpts);
                });
            }
            else {
                // only load in plot data now, when definitely necessary.
                self.model.fetch();
                var opts = SpinnerConfig['plot-view'];
                new Spinner(opts).spin(self.el);
            }
            return self;
        },

        initialize: function() {
            var self = this;
            $(window).on("resize.app", _.bind(this.render, this));
            self.model.bind('change:data', self.render, self);
        },

        view: function() {
            $('#content-pane').html(this.$el);
            this.render();
        },

        close: function() {
            this.$el.detach();
        },

        remove: function() {
            $(window).off("resize.app");
            Backbone.View.prototype.remove.call(this);
        }

    });
});