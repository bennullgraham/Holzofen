rq = [
    'app/model/FiringCollection',
    'app/view/FiringView',
    'app/template',
    'lib/plupload',
];
define(rq, function(FiringCollection, FiringView, empty) {

    var Firings = new FiringCollection;

    var HolzofenView = Backbone.View.extend({

        el: $('#HolzofenApp'),
        
        events: {
            'keypress #new-firing'                  : 'createOnEnter',
            'click #firing-util .import'            : 'showUpload',
            'click #plupload-container .upload'     : 'hideUpload'
        },

        initialize: function() {
            var self = this;

            self.createEventBus(self);

            self.EventBus.on('firing:uploaded', function(id) {
                Firings.create({'id': id});
            });

            $(this.el).template('holzofen-app', {}, function() {
                self.input = self.$("#new-firing");
                Firings.bind('add', self.addOne, self);
                //Firings.bind('remove', self.removeOne, self);
                Firings.bind('reset', self.addAll, self);
                Firings.bind('all', self.render, self);
                Firings.fetch();
            });
        },


        createEventBus: function(self) {
            self.EventBus = {};
            _.extend(self.EventBus, Backbone.Events);
            window.Application = self;
        },


        render: function() {
            // ...
        },

        addOne: function (firing) {
            var view = new FiringView({model: firing});
            this.$('#firing-list').append(view.render().el);
        },

        addAll: function () {
            Firings.each(this.addOne);
        },

        /*removeOne: function() {
            Firings
        }*/

        createOnEnter: function(e) {
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;

            Firings.create({data: this.input.val()});
            this.input.val('');
        },

        showUpload: function() {
            var self = this;
            self.$('#import-container').template('uploader', {}, function() {
                self.$('#import-container').addClass('active');
            });
        },

        hideUpload: function() {
            this.$('#import-container').empty();
        }

    });

    return new HolzofenView;
});