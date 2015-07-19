 define(function(require, exports, module) {

     var Backbone = require("Backbone");

     var DicomDictSearchViewModel = Backbone.Model.extend({
         defaults: {
             showSearch: false,
             showLoading: false,
             noResultFoundMessage: 'No Dicom Tags Found',
             searchString: ''
         },

         setLoadingState: function(searchString) {
             this.set('showLoading', true, {
                 silent: true
             });
             this.set('showSearch', false, {
                 silent: true
             });
             this.set('noResultFoundMessage', 'Loading...', {
                 silent: true
             });

             if (searchString !== undefined && searchString !== null) {
                 this.set('searchString', searchString, {
                     silent: true
                 });
             }

             this.trigger('change');

         },

         setSearchState: function(searchString) {
             this.set('showLoading', false, {
                 silent: true
             });
             this.set('showSearch', true, {
                 silent: true
             });
             this.set('noResultFoundMessage', 'Loading...', {
                 silent: true
             });

             if (searchString !== undefined && searchString !== null) {
                 this.set('searchString', searchString, {
                     silent: true
                 });
             }

             this.trigger('change');

         }
     });

     module.exports = DicomDictSearchViewModel;
 });