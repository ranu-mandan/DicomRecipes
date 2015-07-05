define(function(require, exports, module) {

    // External dependencies.
    var Backbone = require("Backbone");
    var app = require("app");
    var landingViewTemplate = require('text!templates/landingPageView.html');

    var LandingPageView = Backbone.View.extend({
        template: _.template(landingViewTemplate),
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