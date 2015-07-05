// Kick off the application.
require(["app", "router", "Backbone"], function(app, Router, Backbone ) {

    // bootstrap foundation
    //jQuery(document).foundation();

    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.Router = new Router();

    // Trigger the initial route and enable HTML5 History API support, set the
    // root folder to '/' by default.  Change in app.js.
    //Backbone.history.start({ pushState: true, root: app.root }); //pushState not working gives error
    Backbone.history.start({
        pushState: false
    });

    // for testing
    // app.router.navigate('blank', {trigger: true, replace: true});
});