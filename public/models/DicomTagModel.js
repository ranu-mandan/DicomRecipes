define(function(require, exports, module) {

	var Backbone = require("Backbone");

    var DicomTagModel = Backbone.Model.extend({
        defaults: {
            showSearch: false,
            showLoading: false,
            noResultFoundMessage: 'No Dicom Tags Found',
            searchString: ''
        }
    });

    module.exports = DicomTagModel;
});