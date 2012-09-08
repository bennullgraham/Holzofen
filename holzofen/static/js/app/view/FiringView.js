var rq = [
    'app/view/PlotView',
];
define(rq, function(PlotView){

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

            self.PlotView = new PlotView({model: self.model});

            Application.EventBus.on('firing:view', function(id) {
                if (id!==self.model.id)
                    self.close();
            });
        },

        render: function() {
            var self = this;
            // data = self.model.toJSON();
            // data['created_date'] = new Date(data['created']).toDateString();
            var data = {
                created_date: new Date('2011-01-01 01:23').toDateString(),
                title: 'Empty Firing'
            };
            
            self.$el.template('firing-view', data, function(){});
            return self;
        },

        view: function() {
            Application.EventBus.trigger('firing:view', this.model.id);
            this.PlotView.view();
            $(this.el).addClass('active');
        },

        close: function() {
            this.PlotView.close();
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