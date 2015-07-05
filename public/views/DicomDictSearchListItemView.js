define(function(require, exports, module) {

    // External dependencies.
    var Backbone = require("backbone");
    var app = require("app");

    var DicomDictSearchListItemView = Backbone.View.extend({
        template: _.template($("#dicomTagItemView-template").html()),
        tagName: 'tr',

        initialize: function() {
            _.bindAll(this, 'render');
            this.render();
        },

        render: function() {
            var renderedContent = this.template(this.model.toJSON());
            this.$el.html(renderedContent);
            return this;
        }

    });

    module.exports = DicomDictSearchListItemView;

});