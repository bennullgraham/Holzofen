var rq = [
    'app/view/PlotView',
    'lib/spin',
];
define(rq, function(PlotView, Spinner){

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
            self.model.fetch();
            self.PlotView = new PlotView({model: self.model});

            Application.EventBus.on('firing:view', function(id) {
                if (id!==self.model.id)
                    self.close();
            });
        },

        render: function() {
            var self = this;
            var data = self.model.toJSON();
            
            if(typeof data['data'] !== 'undefined') {
                /* I don't think i should be accounting for timezone here, but apparently I need to */
                date_human = new Date(data['data_date'] - (10 * 60 * 60 * 1000));
                data['duration'] = Math.round(data['duration'] / (1000  * 60 * 60));
                data['max_temp'] = Math.round(data['max_temp']);
                data['data_date_human'] = date_human.toDateString();
                self.$el.template('firing-view', data, function(){});
            }
            else {
                self.$el.empty();
                var opts = {
                    lines: 13, // The number of lines to draw
                    length: 1, // The length of each line
                    width: 2, // The line thickness
                    radius: 6, // The radius of the inner circle
                    corners: 1, // Corner roundness (0..1)
                    rotate: 0, // The rotation offset
                    color: '#000', // #rgb or #rrggbb
                    speed: 1, // Rounds per second
                    trail: 60, // Afterglow percentage
                    shadow: false, // Whether to render a shadow
                    hwaccel: false, // Whether to use hardware acceleration
                    className: 'spinner', // The CSS class to assign to the spinner
                    zIndex: 2e9, // The z-index (defaults to 2000000000)
                    top: '10px', // Top position relative to parent in px
                    left: '110px' // Left position relative to parent in px
                };
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