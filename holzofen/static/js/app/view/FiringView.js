define(['app/template'], function(template){
    return Backbone.View.extend({

        tagName: "li",

        events: {
            'click'             : "edit",
            'keypress .edit'    : "updateOnEnter",
            'blur .edit'        : "close"
        },

        initialize: function() {
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
        },

        render: function() {
            var self = this;

            self.$el.template('firing-view', self.model.toJSON(), function(){
                self.$el.addClass('firing-list-item');
                self.input = self.$('.edit');
                self.input.bind('blur', self.close());
            });
            self.setContent();
            return self;
        },

        setContent: function() {
            //this.$('.data').html(this.model.get('data'));
        },

        edit: function() {
            $(this.el).addClass('editing');
            this.input.focus();
        },

        close: function() {
            this.model.save({data: this.input.val()});
            $(this.el).removeClass('editing');
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