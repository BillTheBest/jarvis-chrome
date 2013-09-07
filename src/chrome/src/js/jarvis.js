/* Global Jarvis container object.
 *
 * Will be used as the root namespace for all custom functions.
 */
(function($, _) {

    'use strict';

    window.Jarvis = window.Jarvis || {}

    // private variables
    var debug_prefix = '[JARVIS_DEBUG]',
        base_api_url = 'http://www.jdev.com/api/';

    $.extend(window.Jarvis, {

        // public variables
        HASHTAG_KEY: 35,
        METION_KEY: 64,
        DEBUG: false,
        BASE_API_URL: base_api_url,
        AUTHORIZATION_TOKEN: null,
        DRAFTS_API_ENDPOINT: base_api_url + 'drafts/',
        MESSAGES_API_ENDPOINT: base_api_url + 'messages/',
        THREADS_API_ENDPOINT: base_api_url + 'threads/',

        // public functions
        debug: function() {
            if (this.DEBUG) {
                var debug_arguments = [debug_prefix];
                _.each(arguments, function(arg) {
                    debug_arguments.push(arg);
                });
                console.log.apply(console, debug_arguments);
            }
        },

        namespace: function(ns) {
            var parts = ns.split('.'),
                currentNameSpace = this,
                len = parts.length,
                i;

            for (i = 0, len; i < len; i++) {
                if (!currentNameSpace[parts[i]]) {
                    currentNameSpace[parts[i]] = {};
                }
                currentNameSpace = currentNameSpace[parts[i]];
            }
            return currentNameSpace;
        },

        ajaxSetup: function(authToken) {
            $.ajaxSetup({
                beforeSend: function(xhrObject) {
                    xhrObject.setRequestHeader('Authorization', 'Token ' + authToken);
                }
            });
        },

        request: function(url, method, data) {
            return $.ajax({
                url: url,
                type: method,
                data: JSON.stringify(data),
                contentType: 'application/json',
            })
        }

    });
})(window.jQuery, window._);
