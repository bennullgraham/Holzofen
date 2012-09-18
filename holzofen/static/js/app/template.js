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
        $.get('template/'+template_path, function(template) {
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

});