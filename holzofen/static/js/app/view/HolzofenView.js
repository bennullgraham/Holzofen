define(
[
    'app/view/FiringCollectionView',
    'app/view/ContentCollectionView',
    'app/view/ContentPane',
    'app/template',
    'lib/plupload',
    'lib/jquery.bootstrap.modal',
    'lib/jquery.bootstrap.tooltip'
],
function(FiringCollectionView, ContentCollectionView, ContentPane) {

    var HolzofenView = Backbone.View.extend({

        el: $('#HolzofenApp'),

        events: {
            'click .import-firings'                 : 'showUpload',
            'click #plupload-container .upload'     : 'hideUpload'
        },

        tooltipOpts: { placement: 'bottom' },

        initialize: function() {
            var self = this;
            self.EventBus = _.clone(Backbone.Events);
            window.Holzofen = self;
            Holzofen.EventBus.on('firing:uploaded', function(id) {
                self.hideUpload();
            });
            self.render();
        },


        render: function() {
            var self = this;
            self.$el.template('holzofen-app', {}, function() {
                $('#header-nav a').tooltip(self.tooltipOpts);
                $('#left-pane').empty();
                self.ContentsView = new ContentCollectionView();
                self.FiringsView = new FiringCollectionView();
                $('#left-pane').append(self.ContentsView.render().el);
                $('#left-pane').append(self.FiringsView.render().el);
                self.ContentPane = new ContentPane({el: $('#content-pane')});
            });
        },

        showUpload: function() {
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

    return new HolzofenView();
});