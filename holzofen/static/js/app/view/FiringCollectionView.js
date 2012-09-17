rq = [
    'app/CollectionView',
    'app/model/FiringCollection',
    'app/view/FiringViewItem',
    'app/view/FiringViewFull',
    'app/SpinnerConfig'
];
define(rq, function(CollectionView, FiringCollection, FiringViewItem, FiringViewFull, SpinnerConfig) {

    return CollectionView.extend({

        id: 'firings-list',
        tagName: 'section',
        templatePath: 'firing-collection-view',
        collection: new FiringCollection(),
        View: FiringViewItem,
        spinnerOpts: SpinnerConfig['default'],

        sub_initialize: function() {
            var self = this;

            Holzofen.EventBus.on('firing:uploaded', function(id) {
                self.collection.create({'id': id});
            });

            Holzofen.EventBus.on('firing:view',  function(id) { self.childViewed(id); });
            Holzofen.EventBus.on('firing:close', function(id) { self.childClosed(id); });
        },

        childViewed: function(id) {
            var self = this;

            // close any currently open list-item views
            _(self.collectionViews).each(function(view){
                if (view.model.id !== id) view.close();
            });

            // open big view
            model = self.collection.get(id);
            view = new FiringViewFull({model: model});
            Holzofen.ContentPane.insert(view);
        },

        childClosed: function(id) {
            var self = this;

            // close list item associated with full view
            _(self.collectionViews).each(function(view){
                if (view.model.id === id) view.close();
            });
        }

    });

});