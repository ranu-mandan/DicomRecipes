define(function(require, exports, module) {

	var Backbone = require("backbone");

    var DicomDictSearchViewModel = Backbone.Model.extend({
        defaults: {
            showSearch: false,
            showLoading: false,
            noResultFoundMessage: 'No Dicom Tags Found',
            searchString: ''
        }
    });

    module.exports = DicomDictSearchViewModel;
});