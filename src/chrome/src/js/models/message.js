define([
    'jquery',
    'underscore',
    'backbone',
    'jarvis'
], function($, _, Backbone, J) {

    var MessageModel = Backbone.Model.extend({

        urlRoot: J.MESSAGES_API_ENDPOINT

    });

    return MessageModel;

});
