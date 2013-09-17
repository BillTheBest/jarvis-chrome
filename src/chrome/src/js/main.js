scripts = document.getElementsByTagName('head')[0].getElementsByTagName('script');
var baseURL = null;
for(var i =0,l=scripts.length; i <l;i++) {
    // fetch the chrome extension base url from the script we loaded
    var matches = /(.*src\/js\/)main\.js$/.exec(scripts[i].src);
    if(matches) {
        baseURL = matches[1];
        break;
    }
}
require.config({
    baseUrl: baseURL,
    paths: {
        jquery: '../../lib/js/bower_components/jquery/jquery.min',
        underscore: '../../lib/js/bower_components/underscore/underscore-min',
        backbone: '../../lib/js/bower_components/backbone/backbone',
        jquery_ui: '../../lib/js/bower_components/jquery-ui/ui/minified/jquery-ui.min',
        tag_it: '../../lib/js/bower_components/tag-it/js/tag-it.min',
        gmailr: '../../lib/js/vendor/gmailr/chrome/lib/gmailr',
        jquery_bbq: '../../lib/js/vendor/gmailr/chrome/lib/jquery-bbq/jquery.ba-bbq.min',
        gmailui: '../../lib/js/vendor/gmailui/lib/GMailUI',
        text: '../../lib/js/bower_components/requirejs-text/text',
        templates: '../templates'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'tag_it': {
            deps: ['jquery_ui'],
        },
        'gmailr': {
            deps: ['jquery', 'jquery_bbq'],
            exports: 'Gmailr'
        },
        'jquery_ui': {
            deps: ['jquery'],
        }
    }
});

require([
    'app',
], function(App){
    App.init();
});
