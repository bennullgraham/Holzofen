define(
[
    'lib/underscore',
    'lib/jquery'
], function() {

    var cache = {};

    $.fn.template = function(template_path, data, callback) {
        var self = this;

        if (cache[template_path]) {
            render(self, cache[template_path], data, callback);
            return self;
        }
        $.get('templates/'+template_path, function(template) {
            cache[template_path] = template;
            render(self, template, data, callback);
        });
        return self;
    };

    function render(element, template, data, callback) {
        if (!template) return false;
        data = data || {};
        callback = callback || function(){};
        
        element.html(_.template(template, data));
        callback();
    }

/**
 * Fetch all templates from the server so we have them cached and good to
 * go. This won't have cached content ready to go for some UI which
 * renders immediately, but will reduce calls later on.
 *
 */
    (function bootstrap() {
        $.get('templates/', function(templates) {
            _(templates).each(function(template, template_path) {
                cache[template_path] = template;
            });
        });
    })();

});