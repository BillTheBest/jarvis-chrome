if (top.document === document) {
    // this is required by gmailr to ensure that we operate on the correct window instance
    yepnope([
        chrome.extension.getURL("lib/js/bower_components/jquery/jquery.min.js"),
        chrome.extension.getURL("lib/js/bower_components/underscore/underscore-min.js"),
        chrome.extension.getURL("lib/js/bower_components/backbone/backbone.js"),
        chrome.extension.getURL("lib/js/bower_components/jquery-ui/ui/minified/jquery-ui.min.js"),
        chrome.extension.getURL("lib/js/bower_components/tag-it/js/tag-it.min.js"),
        chrome.extension.getURL("lib/js/vendor/gmailr/chrome/lib/jquery-bbq/jquery.ba-bbq.min.js"),
        chrome.extension.getURL("lib/js/vendor/gmailr/chrome/lib/gmailr.js"),
        chrome.extension.getURL("lib/js/vendor/gmailui/lib/GMailUI.js"),
        chrome.extension.getURL("src/js/jarvis.js"),
        chrome.extension.getURL("src/js/composer.js"),
        chrome.extension.getURL("src/js/watcher.js"),
        chrome.extension.getURL("src/js/models/draft.js"),
        chrome.extension.getURL("src/js/models/message.js"),
        chrome.extension.getURL("src/js/models/tag.js"),
        chrome.extension.getURL("src/js/collections/tags.js"),
        chrome.extension.getURL("src/js/views/compose.js"),
        chrome.extension.getURL("src/js/views/tagbar.js"),
        chrome.extension.getURL("src/js/routers/router.js"),
        chrome.extension.getURL("src/js/main.js")
    ]);
}
