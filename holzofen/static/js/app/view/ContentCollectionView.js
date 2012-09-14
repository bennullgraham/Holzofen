rq = [
    'app/CollectionView',
    'app/model/ContentCollection',
    'app/view/ContentViewItem',
    'app/SpinnerConfig'
];
define(rq, function(CollectionView, ContentCollection, ContentViewItem, SpinnerConfig) {

    return CollectionView.extend({

        id: 'contents-list',
        tagName: 'section',
        templatePath: 'content-collection-view',
        collection: new ContentCollection,
        collectionViews: [],
        View: ContentViewItem,
        spinnerOpts: SpinnerConfig['default']

    });

});