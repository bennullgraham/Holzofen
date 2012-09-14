rq = [
    'app/view/FiringCollectionView',
    'app/view/ContentCollectionView',
    'app/template',
    'lib/plupload',
    'lib/jquery.bootstrap.modal',
    'lib/jquery.bootstrap.tooltip'
];
define(rq, function(FiringCollectionView, ContentCollectionView) {

    var HolzofenView = Backbone.View.extend({

        el: $('#HolzofenApp'),
        
        events: {
            'click .import-firings'                 : 'showUpload',
            'click #plupload-container .upload'     : 'hideUpload'
        },

        tooltipOpts: {
            placement: 'bottom'
        },

        initialize: function() {
            var self = this;

            self.createEventBus(self);

            

            $(this.el).template('holzofen-app', {}, function() {
                self.$no_firings = self.$('#no-firings');

                self.ContentsView = new ContentCollectionView;
                self.FiringsView = new FiringCollectionView;
                $('#header-nav a').tooltip(self.tooltipOpts);

                $('#left-pane').append(self.ContentsView.render().el);
                $('#left-pane').append(self.FiringsView.render().el);
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


        checkNone: function() {
            var self = this;
            if (Firings.length === 0) {
                self.no_firings.show();
            } else {
                self.no_firings.hide();
            }
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