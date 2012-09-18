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
        poll: null,

        initialize: function() {
            var self = this;
            $(window).on("resize.app", _.bind(self.render, self));
            self.model.on('change:data', self.render, self);
            self.model.on('destroy', self.close, self);
            self.beginPolling();
        },

        render: function() {
            var self = this;
            var data = self.model.toJSON();

            if(typeof data.data !== 'undefined') {
                if (self.$el.closest('body').length > 0) {
                    self.$el.template('plot-view', {}, function(){
                        var placeholder = self.$('.plot-placeholder');
                        $.plot(placeholder, data.data, self.plotOpts);
                    });
                }
                else {
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

        close: function() {
            var self = this;
            $(window).off("resize.app");
            self.endPolling();
            self.remove();
        },

        beginPolling: function() {
            var self = this;
            console.log('beginning polling');
            self.poll = setInterval(function(){ self.model.fetch(); }, 1000);
        },

        endPolling: function() {
            var self = this;
            console.log('ending polling');
            if (self.poll) clearInterval(self.poll);
        }

    });
});