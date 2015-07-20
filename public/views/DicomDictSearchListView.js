define(function(require, exports, module) {

    // External dependencies.
    var Backbone = require("Backbone");
    var app = require("app");
    var DicomDictSearchListItemView = require("views/DicomDictSearchListItemView");

    var DicomDictSearchListView = Backbone.View.extend({
        subViews: [],

        initialize: function() {
            _.bindAll(this, 'render');
            this.listenTo(this.collection, 'add', this.append, this);
            this.listenTo(this.collection, 'reset', this.render, this);
        },

        render: function() {

            this.$el.empty();

            // TODO: refactor
            // create a sub view for every model in the collection
            _.each(this.collection.models, function(tag) {
                this.subViews.push(new DicomDictSearchListItemView({
                    model: tag
                }));
            }, this);

            var container = document.createDocumentFragment();

            _.each(this.subViews, function(subview) {
                container.appendChild(subview.render().el);
            });

            this.$el.append(container) ;

            return this;
        },

        append: function(){
            // TODO: implement
        },

        close: function() {
            this.remove();
            this.unbind();

            _.each(this.subViews, function(subview) {
                if (childView.close) {
                    childView.close();
                }
            });
        }

    });

    module.exports = DicomDictSearchListView;

});