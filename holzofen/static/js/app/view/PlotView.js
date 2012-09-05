rq = [
    'lib/jquery.flot'
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
            // var self = this;
            // self.model.bind('change', self.render, self);
        },

        view: function() {
            //console.dir('viewing plot ' + this.model.id);
            var self = this;
            self.render(function() {
                $('#content-pane').append(self.el);
                var options = {};
                var data = self.model.toJSON();
                self.plot = $.plot($(self.el), data['plot_data'], options);
            });
        },

        close: function() {
            $(this.el).remove();
        }

    });
});