require.config({
    paths: {
        "jquery": "bower_components/jquery/dist/jquery.min",
        "foundation": "bower_components/foundation/js/foundation",
        "underscore": "bower_components/underscore/underscore-min",
        "backbone": "bower_components/backbone/backbone-min"
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone',
        },
        'underscore': {
            exports: '_'
        }
    },

    deps: ["main"]
});