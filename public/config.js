require.config({
    paths: {
        jQuery: "bower_components/jquery/dist/jquery.min",
        foundation: "bower_components/foundation/js/foundation",
        Underscore: "bower_components/underscore/underscore-min",
        Backbone: "bower_components/backbone/backbone-min",
        text: 'bower_components/requirejs-text/text',
        templates: 'templates'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'Backbone': {
            deps: ['jQuery', 'Underscore'],
            exports: 'Backbone',
        },
        'Underscore': {
            exports: '_'
        }
    },

    deps: ["main"]
});