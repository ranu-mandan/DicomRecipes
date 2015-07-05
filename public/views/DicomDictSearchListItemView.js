define(function(require, exports, module) {

    // External dependencies.
    var Backbone = require("Backbone");
    var app = require("app");
    var dicomTagViewTemplate = require("text!templates/dicomTagItemView.html");

    var DicomDictSearchListItemView = Backbone.View.extend({
        template: _.template(dicomTagViewTemplate),
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