define([
    'jquery',
    'underscore',
    'backbone',
    'jarvis',
    'views/thread'
], function($, _, Backbone, J, ThreadView) {
    'use strict';

    var Workspace = Backbone.Router.extend({

        routes: {
            'inbox/:message_id': 'messageView',
            'sent/:message_id': 'messageView'
        },

        messageView: function(message_id) {
            debugger;
            J.debug('viewing message:', message_id);
            // want to pull tags for the given message id
        }
    });

    var init = function() {
        var workspace = new Workspace;
        Backbone.history.start();
    };

    return {
        init: init
    }
});
