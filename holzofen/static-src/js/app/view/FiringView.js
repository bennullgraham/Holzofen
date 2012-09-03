var FiringView = Backbone.View.extend({

    tagName: "li",

    template: _.template($('#firing-template').html()),

    events: {
        'click'             : "edit",
        'keypress .edit'    : "updateOnEnter",
        'blur .edit'        : "close"
    },

    initialize: function() {
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.remove, this);
        console.dir(this.template());
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$edit = this.$('.edit');
        this.setContent();
        return this;
    },

    setContent: function() {
        this.$('.data').html(this.model.get('data'));
    },

    edit: function() {
        this.$el.addClass('editing');
        this.$edit.focus();
    },

    close: function() {
        var v = this.$edit.value();
        if (!v)
            this.clear();
        this.model.save({data: v});
        this.$el.removeClass('editing');
    },

    clear: function() {
        this.model.clear();
    },

    updateOnEnter: function(e) {
        if (e.keyCode == 13)
            this.close();
    }
});