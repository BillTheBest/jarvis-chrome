/* Global Jarvis container object.
 *
 * Will be used as the root namespace for all custom functions.
 */
(function($, _) {

    'use strict';

    window.Jarvis = window.Jarvis || {}

    // private variables
    var debug_prefix = '[JARVIS_DEBUG]';

    $.extend(window.Jarvis, {

        // public variables
        HASHTAG_KEY: 35,
        METION_KEY: 64,
        DEBUG: false,


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
        }

    });
})(window.jQuery, window._);
