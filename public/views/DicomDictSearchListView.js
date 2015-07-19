define(function(require, exports, module) {

    // External dependencies.
    var Backbone = require("Backbone");
    var app = require("app");
    var DicomDictSearchListItemView = require("views/DicomDictSearchListItemView");

    var DicomDictSearchListView = Backbone.View.extend({
        el: '#grid-container',

        initialize: function() {
            _.bindAll(this, 'render');

            this.subViews = [];

            // create a sub view for every model in the collection
            _.each(this.collection, function(tag) {
                this.subViews.push(new DicomDictSearchListItemView({
                    model: tag
                }));
            }, this);

        },

        render: function() {

            this.$el.find('tbody').empty();

            var container = document.createDocumentFragment();

            _.each(this.subViews, function(subview) {
                container.appendChild(subview.render().el)
            });

            this.$el.find('tbody').append(container);

            return this;
        },

        close: function() {
            this.remove();
            this.unbind();
            
            _.each(this.subViews, function(subview) {
                if (childView.close) {
                    childView.close();
                }
            })
        }

    });

    module.exports = DicomDictSearchListView;

});