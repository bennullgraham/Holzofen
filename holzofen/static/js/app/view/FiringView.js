var rq = [
    'app/view/PlotView',
];
define(rq, function(PlotView){

    return Backbone.View.extend({

        tagName: "li",
        className: "firing-list-item",

        events: {
            'click'                 : "view",
            'keypress .edit'        : "updateOnEnter",
            'blur .edit'            : "close",
            'click .edit .delete'   : "delete"
        },

        initialize: function(options) {
            var self = this;

            self.model.bind('change', self.render, self);
            self.model.bind('destroy', self.close, self);
            self.model.fetch();
            self.PlotView = new PlotView({model: self.model});

            Application.EventBus.on('firing:view', function(id) {
                if (id!==self.model.id)
                    self.close();
            });
        },

        render: function() {
            var self = this;
            var data = self.model.toJSON();        
            data['duration'] = Math.round(data['duration'] / (1000  * 60 * 60)) + 'hrs';
            data['max_temp'] = Math.round(data['max_temp']) + '&deg;c';
            data['data_date_human'] = new Date(data['data_date']).toDateString();
            
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

        updateOnEnter: function(e) {
            if (e.keyCode == 13)
                this.close();
        },

        delete: function(e) {
            if (confirm("Delete this firing?")) {
                this.model.destroy();
                this.remove();
            }
        }
    });
});