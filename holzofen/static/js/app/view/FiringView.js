var rq = [
];
define(rq, function(){

    return Backbone.View.extend({

        tagName: "li",
        className: "firing-list-item",

        events: {
            'click'             : "view",
            'keypress .edit'    : "updateOnEnter",
            'blur .edit'        : "close"
        },

        initialize: function(options) {
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
        },

        render: function() {
            var self = this;

            self.$el.template('firing-view', self.model.toJSON(), function(){
                self.input = self.$('.edit');
                self.input.bind('blur', self.close());
            });
            self.setContent();
            return self;
        },

        setContent: function() {
        },

        view: function() {
            $(this.el).addClass('active');
            //$('#content-pane').append(this.plot.render().el);
        },

        close: function() {
            this.model.save({data: this.input.val()});
            $(this.el).removeClass('active');
        },

        clear: function() {
            this.model.clear();
        },

        updateOnEnter: function(e) {
            if (e.keyCode == 13)
                this.close();
        }
    });
});