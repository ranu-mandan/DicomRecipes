define(function(require, exports, module) {

    // External dependencies.
    var Backbone = require("backbone");
    var app = require("app");

    var LandingPageView = Backbone.View.extend({
        template: _.template($("#landingPage-template").html()),
        tagName: 'div',

        initialize: function() {
            _.bindAll(this, 'render');
        },

        render: function() {
            var renderedContent = this.template();
            this.$el.html(renderedContent);
            return this;
        }
    });

    // creating an app structure
    app.Views.LandingPageView = LandingPageView;

    module.exports = LandingPageView;

});