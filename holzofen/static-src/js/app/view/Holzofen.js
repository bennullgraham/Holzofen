var Holzofen = Backbone.View.extend({

    el: $('#HolzofenApp'),
    
    events: {
        'keypress #new-firing'        : 'createOnEnter'
    },

    initialize: function() {
        this.$edit = this.$("#new-firing");
        Firings.bind('add', this.addOne, this);
        Firings.bind('reset', this.addAll, this);
        Firings.bind('all', this.render, this);
        Firings.fetch();
    },

    render: function() {
        // ...
    },

    addOne: function (firing) {
        var view = new FiringView({model: firing});
        this.$('#firing-list').append(view.render().el);
    },

    addAll: function () {
        Firings.each(this.addOne);
    },

    createOnEnter: function(e) {
        if (e.keyCode != 13) return;
        if (!this.$edit.val()) return;

        Firings.create({data: this.$edit.val()});
        this.$edit.val('');
    }

});