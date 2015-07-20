define(function(require, exports, module) {

    var Backbone = require("Backbone");

    var DicomTagModel = Backbone.Model.extend({
        defaults: {
            tag: '',            // ex. (0000,0008)
            name: '',           // ex. PatientId
            desc: '',           // ex. Tag Description
            vr: '',             // ex. Value Representation
            vm: '',             // ex. Value Multiplicity
            type: ''            // ex. Type of Element 1 / 2 .etc.
        },

        setDicomTag: function(tag, name, desc, vr, vm, type){
            this.set({ tag: tag || 'Error' });
            this.set({ name: name || '' });
            this.set({ desc: desc || 'Lorem Ipsum.Lorem Ipsum.Lorem Ipsum.Lorem Ipsum. Lorem Ipsum.Lorem Ipsum.Lorem Ipsum.Lorem Ipsum' });
            this.set({ vr: vr || '' });
            this.set({ vm: vm || '' });
            this.set({ type: type || '' });

            //for reference - Backbone.Model.prototype.set.apply(this, arguments);
        }
    });

    module.exports = DicomTagModel;
});