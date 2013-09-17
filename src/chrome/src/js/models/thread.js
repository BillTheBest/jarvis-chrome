define([
    'jquery',
    'underscore',
    'backbone',
    'jarvis',
    'collections/thread_tags'
], function($, _, Backbone, J, ThreadTags) {
    'use strict';

    var ThreadModel = Backbone.Model.extend({

        idAttribute: 'thread_id',

        urlRoot: J.THREADS_API_ENDPOINT,

        constructor: function() {
            Backbone.Model.prototype.constructor.apply(this, arguments);
            this.tags = new ThreadTags([], {
                thread_id: this.id
            });
        },

        url: function() {
            var base = Backbone.Model.prototype.url.apply(this, arguments);
            // ensure we always have trailing '/'
            // XXX we'll need this in every model so we should extend
            // Backbone.Model some where so we can use our own
            return base + (base.charAt(base.length - 1) === '/' ? '' : '/');
        },

        parse: function(data, options) {
            this.tags.reset(data.message.tags);
            return data;
        }

    });

    return ThreadModel;

});
