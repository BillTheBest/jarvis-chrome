define([
    'jquery',
    'underscore',
    'backbone',
    'jarvis',
    'models/tag'
], function($, _, Backbone, J) {
    'use strict';

    var TagsCollection = Backbone.Collection.extend({

        model: TagModel,

        url: function() {
            var url = J.DRAFTS_API_ENDPOINT;
            if (!this.draft.id) {
                url += '?draft_id=' + this.draft.get('draft_id');
            } else {
                url += (this.draft.id + '/tags/');
            }
            return url;
        },

        parse: function(response, options) {
            J.debug('collections response', response);
            if (response.results) {
                return response.results[0].tags;
            }
            return response;
        },

        initialize: function(models, options) {

            this.$compose_id = options.$compose_id;
            this.$draft_id = options.$draft_id;
            this.draft = options.draft;
            this.persistent = options.persistent ? options.persistent : false;

        }

    });

    return TagsCollection;

});
