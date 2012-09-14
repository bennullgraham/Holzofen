var rq = [
    'lib/spin',
    'app/SpinnerConfig',
    'app/model/ContentCollection',
    'app/view/ContentViewItem'
];
define(rq, function(Spinner, SpinnerConfig, ContentCollection, ContentViewItem){
    
    var Contents = new ContentCollection;

    return Backbone.View.extend({

        tagName: "section",
        id: "contents-list",
        contentViews: [],

        initialize: function(options) {
            var self = this;
            Contents.fetch();
            Contents.bind('reset', self.reset, self);
            Contents.bind('add', self.add);
            Contents.bind('remove', self.remove);
            Contents.bind('all', self.render);
        },

        render: function() {
            var self = this;
            $(self.el).template('content-collection-view', {}, function() {
                if(Contents.length) {
                    _(self.contentViews).each(function(view){
                        $('ul', self.el).append(view.render().el);
                    });
                }
                else {
                    if (self.$el) self.$el.empty();
                    var opts = SpinnerConfig['content-collection-view'];
                    new Spinner(opts).spin(self.el);
                }
            });
            return self;
        },

        // add new view to the array of views this collection maintains
        add: function(content) {
            var self = this;
            self.contentViews.push(new ContentViewItem({model: content}));
            self.render();
        },

        // remove view from the array of views this collection maintains
        remove: function(content) {
            var self = this;
            var removable = _(self.contentViews).select(function(v) { return v.model === model; });
            self.contentViews = _(self.contentViews).without(removable);
            self.render();
        },

        reset: function(collection) {
            var self = this;
            self.contentViews = collection.map(function(content){
                return new ContentViewItem({model: content});
            });
            self.render();
        }

    });

});