define(function(require, exports, module) {
    "use strict";

    // External dependencies.
    var Backbone = require("Backbone");
    var app = require("app");
    var LandingPageView = require("views/LandingPageView");
    var DicomDictSearchViewModel = require("models/DicomDictSearchViewModel");
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

            var landingPage = new LandingPageView();

            this.changeView(landingPage);
        },

        search: function(param) {
            console.log(this.current(), 'route -> search');

            //if (!this.searchPage) {
            var searchModel = new DicomDictSearchViewModel();
            var searchPage = new DicomDictSearchView({
                model: searchModel
            });
            //}

            this.changeView(searchPage);

            if (param) {
                this.currentView.searchString = param;
                this.currentView.trigger('searchDicomTag', param);
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
        },

        changeView: function(view) {
            if (this.currentView) {
                if (this.currentView == view) {
                    return;
                }
                this.currentView.close();
            }

            this.$container.empty();
            this.$container.append(view.render().el);

            this.currentView = view;
        }
    });

    module.exports = Router;
});