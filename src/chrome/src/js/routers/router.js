define([
    'jquery',
    'underscore',
    'backbone',
    'jarvis',
    'views/threads/thread'
], function($, _, Backbone, J, ThreadView) {
    'use strict';

    var Router = Backbone.Router.extend({

        initialize: function() {
            _.bindAll(this, 'delayedView', '_loadView');
        },

        routes: {
            'inbox/:thread_id': 'threadView',
            'sent/:thread_id': 'threadView'
        },

        threadView: function(thread_id) {
            J.debug('viewing message:', thread_id);
            this.delayedView(ThreadView, {thread_id: thread_id});
        },

        delayedView: function(view, options) {
            // some view elements might not be present while gmail is loading.
            // this lets us wait until the element is visible before initing
            // the view.
            // XXX some way to set a timeout on this
            this.intervalId = window.setInterval(this._loadView, 1000, view, options);
        },

        _loadView: function(view, options) {
            if (!$(view.prototype.el).is(':visible')) {
                return;
            }
            J.debug('loading delayed view:', view);
            window.clearInterval(this.intervalId);
            new view(options);
        }

    });

    return Router;

});
