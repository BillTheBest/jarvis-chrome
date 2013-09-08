define([
    'jquery',
    'underscore',
    'backbone',
    'jarvis'
], function($, _, Backbone, J) {
    'use strict';

    var ThreadModel = Backbone.Model.extend({

        urlRoot: J.THREADS_API_ENDPOINT

    });

    return ThreadModel;

});
