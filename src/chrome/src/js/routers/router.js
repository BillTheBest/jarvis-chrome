(function($, J, _, Backbone) {
    'use strict';

    J.namespace('Routers.Workspace');

    J.Routers.Workspace = Backbone.Router.extend({

        routes: {
            'inbox/:message_id': 'messageView',
            'sent/:message_id': 'messageView'
        },

        messageView: function(message_id) {
            debugger;
            J.debug('viewing message:', message_id);
            // want to pull tags for the given message id
        }
    })
})(window.jQuery, window.Jarvis, window._, window.Backbone);
