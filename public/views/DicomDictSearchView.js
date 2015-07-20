define(function(require, exports, module) {

    // External dependencies.
    var app = require("app");
    var Backbone = require("Backbone");
    var DicomDictSearchViewModel = require("models/DicomDictSearchViewModel");
    var DicomTagModel = require("models/DicomTagModel");
    var DicomTags = require("collections/DicomTags");
    var DicomDictSearchListView = require("views/DicomDictSearchListView");
    var DicomDictSearchViewTemplate = require("text!templates/dicomDictSearchView.html");

    var DicomDictSearchView = Backbone.View.extend({
        template: _.template(DicomDictSearchViewTemplate),
        isSearchOn: false,
        searchString: '',

        events: {
            'input .search-box': 'searchDicomDictionary'
        },

        initialize: function() {
            _.bindAll(this, 'render');
            //this.listenTo(object, event, [context]);
            this.listenTo(this, 'searchDicomTag', this.searchDicomTag);
            this.listenTo(this.model, 'change', this.renderWithModel, this);
        },

        initializeSearchListView: function() {

            if (!this.dicomTags) {
                this.dicomTags = new DicomTags([]);
            }

            if (!this.searchListView) {
                this.searchListView = new DicomDictSearchListView({
                    collection: this.dicomTags
                });
            }

            var element = this.$el.find('#grid-container').find('tbody');
            if (element.length > 0) {
                this.searchListView.setElement(element);
            }
        },

        render: function() {

            this.renderWithModel();

            this.$el.find('h1[id=animated-header]').addClass('animated fadeInDown');
            return this;
        },

        renderWithModel: function() {

            var renderedContent = this.template({
                model: this.model.toJSON()
            });
            this.$el.html(renderedContent);

            var searchBox = this.$el.find('input[name=search-box]').get(0);
            var elemLen = searchBox.value.length;
            searchBox.selectionStart = elemLen;
            searchBox.selectionEnd = elemLen;
            searchBox.focus();

            this.initializeSearchListView();

            return this;
        },

        searchDicomTag: function(searchString) {

            this.isSearchOn = true;

            this.model.setLoadingState(searchString);

            var that = this;

            $.ajax({
                url: 'http://localhost:3000/search',
                crossOrigin: true,
                dataType: 'json',
                success: function(resp) {
                    console.log(resp, 'success');

                    that.model.setSearchState();

                    var dicomTags = _.map(resp, function(item) {
                        // initialize DicomTag Model

                        var dicomTag = new DicomTagModel({
                            tag: item.tag,
                            name: item.name,
                            desc: item.desc,
                            vr: item.vr,
                            vm: item.vm,
                            type: item.type
                        });

                        return dicomTag;
                    });

                    // reset the collection
                    that.dicomTags.reset(dicomTags);

                    if (that.searchString == searchString) {
                        that.isSearchOn = false;
                    } else {
                        that.trigger('searchDicomTag', that.searchString);
                    }

                },

                error: function(req, status, err) {
                    console.log('something went wrong', status, err);
                    that.isSearchOn = false;
                }
            });
            //}     
        },

        searchDicomDictionary: _.debounce(function(e) {

            this.searchString = $(e.currentTarget).val();

            if (!this.isSearchOn) {
                var throttled;

                searchString = $(e.currentTarget).val();
                console.log(this.searchString);

                var currentRoute = app.Router.current();

                if (this.searchString) {
                    app.Router.navigate(currentRoute.route + '/' + encodeURIComponent(this.searchString), {
                        trigger: true
                    });

                } else {
                    app.Router.navigate(currentRoute.route, {
                        trigger: true
                    });
                }
            }

        }, 1500)
    });

    module.exports = DicomDictSearchView;

});