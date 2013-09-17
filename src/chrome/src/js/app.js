define([
    'jquery',
    'underscore',
    'backbone',
    'jarvis',
    'gmailr',
    'routers/router',
    'watcher',
    'targets/compose',
    'views/threads/thread'
], function($, _, Backbone, J, Gmailr, Router, Watcher, ComposeTarget, ThreadView) {

    'use strict';

    J.DEBUG = true;
    Gmailr.debug = true;

    var init = function() {
        J.debug('loading extension...');

        // init jarvis watchers
        var composeTarget = new ComposeTarget(),
            composeWatcher = new Watcher(composeTarget),
            router;

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

            G.observe(Gmailr.EVENT_VIEW_SENT_THREAD, function(thread_id) {
                router.threadView(thread_id);
            });

        });

        // jarvis ajax setup
        J.ajaxSetup('f0fcdbc930d4aac159b8f58fb0d54d9c19f4a435');
        J.user_id = 1;
        J.company_id = 1;

        // XXX hack to find which items we're viewing within the inbox
        //_.filter(document.scripts, function(script) {return (!script.src && !script.type && script.innerText.indexOf('VIEW_DATA') > 0)})
        // VIEW_DATA should be available to us, if not, we have to use that hack to find it. Once we have it, we can run:
        //
        // var thread_ids = [];
        // thread_chunks_.filter(VIEW_DATA, function(view) {
        //  return view[0] === 'tb';
        // });
        //
        // _.each(thread_chunks, function(thread_chunk) {
        //  _.each(thread_chunk[2], function(thread) {
        //      thread_ids.push(thread[0]);
        //  });
        // });
        // once we have thread_ids, we can iterate through the table of
        // messages, they should be in exact order
        //
        // init router
        router = new Router;
        Backbone.history.start();
    };

    return {
        init: init
    };

});
