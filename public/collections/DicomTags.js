define(function(require, exports, module) {

    // External dependencies.
    var Backbone = require("Backbone");
    var DicomTagModel = require("models/DicomTagModel");

    var DicomTags = Backbone.Collection.extend({
        model: DicomTagModel
    });

    module.exports = DicomTags;

});