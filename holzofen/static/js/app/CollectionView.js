rq = [
    'lib/spin',
    'app/template'
];
define(rq, function(Spinner) {

    return Backbone.View.extend({

        collectionViews: [],

        initialize: function() {
            var self = this;
            self.collection.fetch();
            self.collection.bind('reset', self.reset, self);
            self.collection.bind('add', self.add);
            self.collection.bind('remove', self.remove);
            self.collection.bind('all', self.render);

            _(['View', 'templatePath', 'spinnerOpts', 'collection']).each(function(v){
                if (typeof self[v] === 'undefined') {
                    console.log('AppCollectionView requires self.' + v + ' to be defined');
                }    
            });

            // hax initialize "inheritance"
            if (typeof self.sub_initialize === 'function') {
                self.sub_initialize();
            }
        },

        render: function() {
            var self = this;
            $(self.el).template(self.templatePath, {}, function() {
                if(self.collection.length) {
                    _(self.collectionViews).each(function(view){
                        $('ul', self.el).append(view.render().el);
                    });
                }
                else {
                    if (self.$el) self.$el.empty();
                    new Spinner(self.spinnerOpts).spin(self.el);
                }
            });
            return self;
        },

        // add new view to the array of views this collection maintains
        add: function(content) {
            var self = this;
            self.collectionViews.push(new self.View({model: content}));
            self.render();
        },

        // remove view from the array of views this collection maintains
        remove: function(content) {
            var self = this;
            var removable = _(self.collectionViews).select(function(v) { return v.model === model; });
            self.collectionViews = _(self.collectionViews).without(removable);
            self.render();
        },

        reset: function(collection) {
            var self = this;
            self.collectionViews = collection.map(function(content){
                return new self.View({model: content});
            });
            self.render();
        }

    });

});