define([
    'jquery',
    'underscore',
    'backbone',
    'jarvis',
    'models/tag'
], function($, _, Backbone, J, TagModel) {
    'use strict';

    var ThreadTags = Backbone.Collection.extend({

        model: TagModel,

        url: function() {
            var url = J.THREADS_API_ENDPOINT + this.thread_id + '/tags/';
            return url;
        },

        initialize: function(models, options) {
            this.thread_id = options.thread_id;
        }

    });

    return ThreadTags;

});
