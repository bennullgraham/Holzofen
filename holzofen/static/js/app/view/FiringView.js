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
            var self = this;

            self.model.bind('change', self.render, self);
            self.model.bind('destroy', self.remove, self);

            Application.EventBus.on('firing:view', function(id) {
                if (id!==self.model.id)
                    self.close();
            });
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
            var self = this;
            Application.EventBus.trigger('firing:view', self.model.id);
            $(self.el).addClass('active');
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