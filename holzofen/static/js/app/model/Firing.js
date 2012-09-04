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
        },

        remove: function() {
            this.destroy();
        },

        dataPoints: function() {
            return count(this.get('data'));
        }

    });
});