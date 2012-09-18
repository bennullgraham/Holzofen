define(
[
    'lib/spin',
    'app/template'
],
function(Spinner) {

    return Backbone.View.extend({

        collectionViews: [],

        initialize: function() {
            var self = this;
            
            self.collection.bind('reset',  self.reset,  self);
            self.collection.bind('add',    self.add,    self);
            self.collection.bind('remove', self.remove, self);

            _(['View', 'templatePath', 'spinnerOpts', 'collection']).each(function(v){
                if (typeof self[v] === 'undefined') {
                    throw 'CollectionView requires self.' + v + ' to be defined';
                }
            });

            self.collection.fetch();

            // hax initialize "inheritance"
            if (typeof self.sub_initialize === 'function') {
                self.sub_initialize();
            }
        },

        render: function() {
            var self = this;
            self.$el.template(self.templatePath, {}, function() {
                self.hideNoItems();
                if(self.collection.length)
                    self.renderChildViews();
                else
                    self.showNoItems();
            });
            return self;
        },

        renderChildViews: function() {
            var self = this;
            _(self.collectionViews).each(function(view){
                self.$('ul').append(view.render().el);
            });
        },

        showNoItems: function() {
            var self = this;
            var $el = self.$('.no-items');
            if ($el.length) {
                $el.show();
            }
        },

        hideNoItems: function() {
            var self = this;
            var $el = self.$('.no-items');
            if ($el.length) {
                $el.hide();
            }
        },

        // add new view to the array of views this collection maintains
        add: function(m) {
            var self = this;
            self.collectionViews.push(new self.View({model: m}));
            self.render();
        },

        // remove view from the array of views this collection maintains
        remove: function(m) {
            var self = this;
            var removable = _(self.collectionViews).select(function(v) { return v.model === m; });
            removable[0].remove();
            self.collectionViews = _(self.collectionViews).without(removable);
            self.render();
        },

        reset: function(collection) {
            var self = this;
            self.collectionViews = collection.map(function(m){
                return new self.View({model: m});
            });
            self.render();
        }

    });

});