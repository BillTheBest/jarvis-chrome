(function($, J, _, Backbone) {
    'use strict';

    J.namespace('Models.ThreadModel');

    J.Models.ThreadModel = Backbone.Model.extend({

        urlRoot: J.THREADS_API_ENDPOINT

    });

})(window.jQuery, window.Jarvis, window._, window.Backbone);
