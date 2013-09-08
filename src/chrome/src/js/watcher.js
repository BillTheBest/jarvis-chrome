define([
    'jquery',
    'underscore',
    'jarvis'
], function($, _, J) {

    var Watcher = function(target) {
        this._throttle    = 1000;
        this._interval_id = null;
        this._target      = target;
        return this;
    };

    // will want to have multiple watchers running at the same time?
    Watcher.prototype.watch = function() {
        J.debug('watching:', this._target);
        this._interval_id = window.setInterval($.proxy(this._target.watch, this._target), this._throttle);
    };

    Watcher.prototype.halt = function() {
        clearInterval(this._interval_id);
    };

    /** will fire "_target" on "this._throttle" intervals. "_view" can be any gmail model? view? we want to watch.
     *
     * ie. compose target window, quick reply box etc.
     *
     */

    return Watcher;

});
