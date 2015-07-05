define(function(require, exports, module) {
    "use strict";

    // External dependencies.
    var Backbone = require("Backbone");
    var app = require("app");
    var LandingPageView = require("views/LandingPageView");
    var DicomDictSearchView = require("views/DicomDictSearchView");

    // Defining the application router.
    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'search': 'search',
            'search/:query': 'search'
        },

        initialize: function() {
            this.$container = $('#container');
        },

        home: function() {
            console.log('route -> home');

            if (this.landingPage){
                this.landingPage.remove();
            }

            this.landingPage = new LandingPageView();

            this.$container.empty();
            this.$container.append(this.landingPage.render().el);
        },

        search: function(param) {
            console.log(this.current(), 'route -> search');

            if (this.searchPage){
                this.searchPage.remove();
            }

            this.searchPage = new DicomDictSearchView();

            this.$container.empty();
            this.$container.append(this.searchPage.render().el);

            if (param) {
                this.searchPage.searchString = param;
                this.searchPage.trigger('searchDicomTag', param);
            }

        },

        current: function() {
            var Router = this,
                fragment = Backbone.history.fragment,
                routes = _.pairs(Router.routes),
                route = null,
                params = null,
                matched;

            matched = _.find(routes, function(handler) {
                route = _.isRegExp(handler[0]) ? handler[0] : Router._routeToRegExp(handler[0]);
                return route.test(fragment);
            });

            if (matched) {
                // NEW: Extracts the params using the internal
                // function _extractParameters 
                params = Router._extractParameters(route, fragment);
                route = matched[1];
            }

            return {
                route: route,
                fragment: fragment,
                params: params
            };
        }

    });

    module.exports = Router;
});