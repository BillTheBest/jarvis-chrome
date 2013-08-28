(function($, Jarvis, _, Backbone, Gmailr) {

    'use strict';

    //, INLINE_REPLY_TEXTAREA_SELECTOR = 'div.Am.aO9.Al.editable.LW-avf'
    //, INLINE_REPLY_HEADER_SELECTOR = 'table.IG tbody tr:first'
    //, TAGBAR_CONTENT = '<tr id="tagbar-row" class="IG" style="background-color: black"><td class="HQ"></td><td class="Iy"><div class="fX aXjCH"></div></tr>';

    Jarvis.DEBUG = true;
    Gmailr.debug = true;

    Jarvis.debug('loading extension...');

    // init jarvis watchers
    var composeView = new Jarvis.WatcherView.Compose(),
        composeWatcher = new Jarvis.Watcher(composeView);

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

    // init router
    Jarvis.Routers.Main = new Jarvis.Routers.Workspace();
    Backbone.history.start();

})(window.jQuery, window.Jarvis, window._, window.Backbone, window.Gmailr);
