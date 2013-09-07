(function($, J, _, Backbone, window) {
    'use strict';

    J.namespace('Collections.Tags');

    J.Collections.Tags = Backbone.Collection.extend({

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

        // need to define a parse method to return draft tags
        model: J.Models.TagModel,

        initialize: function(models, options) {

            this.$compose_id = options.$compose_id;
            this.$draft_id = options.$draft_id;
            this.draft = options.draft;
            this.persistent = options.persistent ? options.persistent : false;

        }

    });

})(window.jQuery, window.Jarvis, window._, window.Backbone, window);
