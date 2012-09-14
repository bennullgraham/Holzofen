rq = [
    'app/CollectionView',
    'app/model/FiringCollection',
    'app/view/FiringViewItem',
    'app/SpinnerConfig'
];
define(rq, function(CollectionView, FiringCollection, FiringViewItem, SpinnerConfig) {

    return CollectionView.extend({

        id: 'firings-list',
        tagName: 'section',
        templatePath: 'firing-collection-view',
        collection: new FiringCollection,
        collectionViews: [],
        View: FiringViewItem,
        spinnerOpts: SpinnerConfig['default'],

        sub_initialize: function() {
            var self = this;
            _.bindAll(this);

            window.Application.EventBus.on('firing:uploaded', function(id) {
                self.hideUpload();
                self.collection.create({'id': id});
            });
        }

    });

});