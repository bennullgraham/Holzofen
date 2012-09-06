rq = [
    // 'plot_data'
];
define(function(PlotData){
    return Backbone.Model.extend({

        defaults: {
            'title': 'empty firing',
            'data': '1, 2, 3, 4...',
            'created': Date.now()
        },

        initialize: function() {
            if (!this.get("title")) {
                this.set({"title": this.defaults.title});
            }
            if (!this.get("plot_data")) {
                this.set({"plot_data": this.defaults.plot_data});
            }
            if (!this.get("created")) {
                this.set({"created": this.defaults.created});
            }
            /*var x = 0;
            var y = 0;
            this.set({
                'plot_data': [[
                    [x+=Math.random(),y+=Math.random()],
                    [x+=Math.random(),y+=Math.random()],
                    [x+=Math.random(),y+=Math.random()],
                    [x+=Math.random(),y+=Math.random()],
                    [x+=Math.random(),y+=Math.random()],
                    [x+=Math.random(),y+=Math.random()],
                    [x+=Math.random(),y+=Math.random()]
                ]]
            });*/
        },

        remove: function() {
            this.destroy();
        },

        dataPoints: function() {
            return count(this.get('plot_data'));
        }

    });
});