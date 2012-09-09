rq = [
    'lib/jquery.flot',
    'lib/jquery.flot.time'
];
define(rq, function(){
    return Backbone.View.extend({

        tagName: 'div',
        className: 'plot-view',

        render: function(callback) {
            var self = this;

            $(self.el).template('plot-view', {}, function(){
                callback();
            });
            return self;
        },

        initialize: function() {
        },

        /* TODO - unretard this */
        view: function() {
            var self = this;
            self.model.fetch({
                success: function(){
                    self.render(function() {
                        $('#content-pane').append(self.el);
                        var options = {
                            xaxis: {
                                mode: "time",
                                timeformat: "%a %H:%M",
                            },
                            grid: {
                                borderWidth: 1,
                                borderColor: 0
                            }
                        };
                        var data = self.model.toJSON();
                        self.plot = $.plot($(self.el), data['data'], options);
                    });
                }
            });
            
        },

        close: function() {
            $(this.el).remove();
        }

    });
});