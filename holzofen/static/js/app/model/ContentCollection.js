var rq = [
    'app/model/Content'
];
define(rq, function(Content) {
    return Backbone.Collection.extend({

        model: Content,

        url: '/content',
        
        comparator: function(content) {
            return content.get('title');
        }

    });
});