define(function(require, exports, module) {

    // External dependencies.
    var Backbone = require("backbone");
    var app = require("app");
    var DicomDictSearchListItemView = require("views/DicomDictSearchListItemView");

    var DicomDictSearchListView = Backbone.View.extend({
        el: '#grid-container',

        initialize: function() {
            _.bindAll(this, 'render');
            this.render();
        },

        render: function() {

            _.each(this.collection, function(tag) {
                var dicomTagItemView = new DicomDictSearchListItemView({
                    model: tag
                });
                this.$el.find('tbody').append(dicomTagItemView.el);
            }, this);

            return this;
        }
    });

    module.exports = DicomDictSearchListView;

});