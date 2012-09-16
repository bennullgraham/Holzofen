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

        tooltipOpts: { placement: 'bottom' },

        initialize: function() {
            var self = this;
            self.EventBus = _.clone(Backbone.Events);
            window.Holzofen = self;
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
            });
        },


        /*checkNone: function() {
            var self = this;
            if (Firings.length === 0) {
                self.no_firings.show();
            } else {
                self.no_firings.hide();
            }
        },*/

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