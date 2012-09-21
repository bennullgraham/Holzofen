define(
[
    'app/model/Content'
],
function(Content) {
    return Backbone.Collection.extend({

        model: Content,

        url: '/content/',
        
        comparator: function(content) {
            return content.get('title');
        }

    });
});