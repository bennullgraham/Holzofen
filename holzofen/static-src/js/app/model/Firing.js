var Firing = Backbone.Model.extend({

    defaults: function(){
        return {
            'title': 'empty firing',
            'data': '',
            'created': Date.now()
        };
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