function __init(){
    var Firing = Backbone.Model.extend({

        defaults: function(){
            return {
                'title': 'empty firing',
                'data': '',
                'created': Date.now()
            };
        },

        initialize: function() {
            if (!this.get("title")) {
                this.set({"title": this.defaults.title});
            }
            if (!this.get("data")) {
                this.set({"data": this.defaults.data});
            }
            if (!this.get("created")) {
                this.set({"created": this.defaults.created});
            }
        },

        remove: function() {
            this.destroy();
        },

        dataPoints: function() {
            return count(this.get('data'));
        }

    });

    var FiringCollection = Backbone.Collection.extend({
        model: Firing,

        localStorage: new Store("firings-backbone"),

        comparator: function(firing) {
            return firing.get('date');
        }

    });

    var Firings = new FiringCollection;

    var FiringView = Backbone.View.extend({

        tagName: "li",

        template: _.template($('#firing-template').html()),

        events: {
            'click'             : "edit",
            'keypress .edit'    : "updateOnEnter",
            'blur .edit'        : "close"
        },

        initialize: function() {
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
            console.dir(this.template());
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$edit = this.$('.edit');
            this.setContent();
            return this;
        },

        setContent: function() {
            this.$('.data').html(this.model.get('data'));
        },

        edit: function() {
            this.$el.addClass('editing');
            this.$edit.focus();
        },

        close: function() {
            var v = this.$edit.value();
            if (!v)
                this.clear();
            this.model.save({data: v});
            this.$el.removeClass('editing');
        },

        clear: function() {
            this.model.clear();
        },

        updateOnEnter: function(e) {
            if (e.keyCode == 13)
                this.close();
        }
    });

    var Holzofen = Backbone.View.extend({

        el: $('#HolzofenApp'),
        
        events: {
            'keypress #new-firing'        : 'createOnEnter'
        },

        initialize: function() {
            this.$edit = this.$("#new-firing");
            Firings.bind('add', this.addOne, this);
            Firings.bind('reset', this.addAll, this);
            Firings.bind('all', this.render, this);
            Firings.fetch();
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

        createOnEnter: function(e) {
            if (e.keyCode != 13) return;
            if (!this.$edit.val()) return;

            Firings.create({data: this.$edit.val()});
            this.$edit.val('');
        }

    });

    var App = new Holzofen;
}
__init();