rq = [
    'app/model/FiringCollection',
    'app/view/FiringView',
    'app/template',
    'lib/plupload',
    'lib/jquery.bootstrap.modal',
    'lib/jquery.bootstrap.tooltip'
];
define(rq, function(FiringCollection, FiringView, empty) {

    var Firings = new FiringCollection;

    var HolzofenView = Backbone.View.extend({

        el: $('#HolzofenApp'),
        
        events: {
            'keypress #new-firing'                  : 'createOnEnter',
            'click .import-firings'                 : 'showUpload',
            'click #plupload-container .upload'     : 'hideUpload'
        },

        tooltipOpts: {
            placement: 'bottom'
        },

        initialize: function() {
            var self = this;

            self.createEventBus(self);

            self.EventBus.on('firing:uploaded', function(id) {
                self.hideUpload();
                Firings.create({'id': id});
            });

            $(this.el).template('holzofen-app', {}, function() {
                self.input = self.$("#new-firing");
                self.no_firings = self.$('#no-firings');
                $('#header-nav a').tooltip(self.tooltipOpts);
                Firings.bind('add', self.addOne, self);
                Firings.bind('reset', self.addAll, self);
                Firings.bind('all', self.checkNone, self);
                Firings.bind('all', self.render, self);
                Firings.fetch();
            });
        },


        createEventBus: function(self) {
            self.EventBus = {};
            _.extend(self.EventBus, Backbone.Events);
            window.Application = self;
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

        checkNone: function() {
            var self = this;
            if (Firings.length==0) {
                self.no_firings.show();
            } else {
                self.no_firings.hide();
            }
        },

        createOnEnter: function(e) {
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;

            Firings.create({data: this.input.val()});
            this.input.val('');
        },

        showUpload: function() {
            console.dir('show');
            var self = this;
            var dialog = $('#import-dialog');
            dialog.template('uploader', {}, function() {
                dialog.modal('show');
            });
            
        },

        hideUpload: function() {
            var dialog = $('#import-dialog');
            dialog.modal('hide');
        }

    });

    return new HolzofenView;
});