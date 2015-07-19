define(function(require, exports, module) {

    // External dependencies.
    var app = require("app");
    var Backbone = require("Backbone");
    var DicomDictSearchViewModel = require("models/DicomDictSearchViewModel");
    var DicomTagModel = require("models/DicomTagModel");
    var DicomDictSearchListView = require("views/DicomDictSearchListView");
    var DicomDictSearchViewTemplate = require("text!templates/dicomDictSearchView.html");

    var DicomDictSearchView = Backbone.View.extend({
        template: _.template(DicomDictSearchViewTemplate),
        isSearchOn: false,
        searchString: '',
        searchListView: {},

        events: {
            'input .search-box': 'searchDicomDictionary'
        },

        initialize: function() {
            _.bindAll(this, 'render');
            //this.listenTo(object, event, [context]);
            this.listenTo(this, 'searchDicomTag', this.searchDicomTag);
            this.listenTo(this.model, 'change', this.renderWithModel, this);
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

            return this;
        },

        //dataType: 'jsonp',
        //jsonp: "callback",
        //crossDomain : true,

        searchDicomTag: function(searchString) {

            this.isSearchOn = true;

            //if(searchString == ''){
            //  var renderedContent = this.template(model);
            //  $(this.el).html(renderedContent);
            //}
            //else{

            this.model.setLoadingState(searchString);

            var that = this;

            $.ajax({
                url: 'http://localhost:3000/search',
                crossOrigin: true,
                dataType: 'json',
                success: function(resp) {
                    console.log(resp, 'success');

                    that.model.setSearchState();

                    var dicomTags = _.map(resp, function(tag) {
                        // initialize DicomTag Model

                        var dicomTag = new DicomTagModel();
                        dicomTag.set({
                            tag: tag.tag
                        });
                        dicomTag.set({
                            name: tag.name
                        });
                        dicomTag.set({
                            description: 'Lorem Ipsum.Lorem Ipsum.Lorem Ipsum.Lorem Ipsum' +
                                'Lorem Ipsum.Lorem Ipsum.Lorem Ipsum.Lorem Ipsum'
                        });
                        dicomTag.set({
                            vr: tag.vr
                        });
                        dicomTag.set({
                            type: 'Type 2'
                        });
                        dicomTag.set({
                            vm: tag.vm
                        });

                        return dicomTag;
                    });

                    if (this.searchListView) {
                        this.searchListView.close();
                    }

                    this.searchListView = new DicomDictSearchListView({
                        collection: dicomTags
                    }).render();

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