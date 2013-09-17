// this is required by gmailr to ensure that we operate on the correct window
// instance
if(top.document === document) {
    yepnope([
        chrome.extension.getURL("lib/js/bower_components/requirejs/require.js"),
        chrome.extension.getURL("lib/js/vendor/require-cs.js"),
        chrome.extension.getURL("src/js/main.js")
    ]);
}
