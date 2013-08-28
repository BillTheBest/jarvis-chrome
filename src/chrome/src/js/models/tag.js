(function($, J, _, Backbone) {
    'use strict';

    J.namespace('Models.TagModel');

    J.Models.TagModel = Backbone.Model.extend({

        defaults: {
            name: ''
        }

    });

})(window.jQuery, window.Jarvis, window._, window.Backbone);
