define([
    'jquery',
    'underscore',
    'backbone',
    'jarvis',
    'gmailr',
    'routers/router',
    'watcher',
    'targets/compose'
], function($, _, Backbone, J, Gmailr, Router, Watcher, ComposeTarget) {

    'use strict';

    J.DEBUG = true;
    Gmailr.debug = true;

    var init = function() {
        J.debug('loading extension...');

        // init jarvis watchers
        var composeTarget = new ComposeTarget(),
            composeWatcher = new Watcher(composeTarget);

        composeWatcher.watch();

        // init gmailr api
        Gmailr.init(function(G) {

            G.observe(Gmailr.EVENT_DRAFT_SAVE, function(details) {
                var oldDraftId = details._raw.draft;
                $(':input[value="' + details._raw.composeid + '"]')
                    .parents('form')
                        .find(':input[name="draft"]')
                        .trigger('draft:save', oldDraftId);
            });

            G.observe(Gmailr.EVENT_COMPOSE, function(details) {
                $(':input[value="' + details._raw.composeid + '"]')
                    .trigger('message:sent', details);
            });

        });

        // jarvis ajax setup
        J.ajaxSetup('f0fcdbc930d4aac159b8f58fb0d54d9c19f4a435');
        J.user_id = 1;
        J.company_id = 1;

        // init router
        Router.init();
    };

    return {
        init: init
    };

});
