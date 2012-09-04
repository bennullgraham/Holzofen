define(function(){
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
            if (!this.get("data")) {
                this.set({"data": this.defaults.data});
            }
            if (!this.get("created")) {
                this.set({"created": this.defaults.created});
            }
            //[ [[0, 0], [1, 1]] ];
            this.set({
                'data': [[
                    [0.0,0.0],
                    [0.1,0.5],
                    [0.2,1.0],
                    [0.4,1.5],
                    [0.8,2.0],
                    [1.6,2.5],
                    [3.2,3.0]
                ]]
            });
        },

        remove: function() {
            this.destroy();
        },

        dataPoints: function() {
            return count(this.get('data'));
        }

    });
});