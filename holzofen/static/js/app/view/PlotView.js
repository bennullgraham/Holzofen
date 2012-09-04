rq = [
    'lib/jquery.flot'
];
define(rq, function(){
    return Backbone.View.extend({

        tagName: "div",

        render: function() {
            var self = this;

            console.dir(self.model);

            self.$el.template('plot-view', {}, function(){
                var plot = self.$el.find('.plot');
                var data = self.model.get('data');
/*                var data = [[
                    [0.00,0.00],
                    [0.05,0.25],
                    [0.10,0.50],
                    [0.20,0.75],
                    [0.40,1.00],
                    [0.80,1.25],
                    [1.60,1.50],
                    [2.00,1.75],
                    [3.40,2.00],
                    [4.00,2.25]
                ]];*/
                console.dir({'plotting': data});
                $.plot(plot, data, { yaxis: { max: 3 } });
            });
            return this;
        },

        initialize: function() {
            this.model.bind('change', this.render, this);
        }

    });
});