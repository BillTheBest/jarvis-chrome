(function($, J, _, Backbone) {
    'use strict';

    J.namespace('Models.MessageModel');

    J.Models.MessageModel = Backbone.Model.extend({

        urlRoot: J.MESSAGES_API_ENDPOINT

    });

})(window.jQuery, window.Jarvis, window._, window.Backbone);
