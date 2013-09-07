(function($, J, _, Backbone) {
    'use strict';

    J.namespace('Models.TagModel');

    J.Models.TagModel = Backbone.Model.extend({

        defaults: {
            name: ''
        },

        url: function() {
            var base = Backbone.Model.prototype.url.apply(this, arguments);
            // ensure we always have trailing '/'
            // XXX we'll need this in every model so we should extend
            // Backbone.Model some where so we can use our own
            return base + (base.charAt(base.length - 1) === '/' ? '' : '/');
        },

        parse: function(response, options) {
            J.debug('tag response', response);
            // XXX look into simplifying this logic
            if (response.data && (response.data.existing_tags || response.data.new_tags)) {
                if (response.data.existing_tags.length) {
                    return response.data.existing_tags[0];
                } else {
                    return response.data.new_tags[0];
                }
            }
            return response;
        }

    });

})(window.jQuery, window.Jarvis, window._, window.Backbone);
