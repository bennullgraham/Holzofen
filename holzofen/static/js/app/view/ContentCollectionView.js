rq = [
    'app/CollectionView',
    'app/model/ContentCollection',
    'app/view/ContentViewItem',
    'app/view/ContentViewFull',
    'app/SpinnerConfig'
];
define(rq, function(CollectionView, ContentCollection, ContentViewItem, ContentViewFull, SpinnerConfig) {

    return CollectionView.extend({

        id: 'contents-list',
        tagName: 'section',
        templatePath: 'content-collection-view',
        collection: new ContentCollection(),
        collectionViews: [],
        View: ContentViewItem,
        spinnerOpts: SpinnerConfig['default'],

        sub_initialize: function() {
            var self = this;

            Holzofen.EventBus.on('content:view', function(id) {
                self.fullView(id);
            });
        },

        fullView: function(id) {
            var self = this;

            model = self.collection.get(id);
            view = new ContentViewFull({model: model});
            Holzofen.ContentPane.insert(view);
        }

    });

});