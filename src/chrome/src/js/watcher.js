Jarvis.namespace('Watcher');

Jarvis.Watcher = function(view) {
    this._throttle     = 1000;
    this._interval_id  = null;
    this._view         = view;
    return this;
}

/** will fire "_view" on "this._throttle" intervals. "_view" can be any gmail model? view? we want to watch.
 *
 * ie. compose view window, quick reply box etc.
 *
 */

// will want to have multiple watchers running at the same time?
Jarvis.Watcher.prototype.watch = function() {
    window.Jarvis.debug('watching:', this._view);
    this._interval_id = window.setInterval($.proxy(this._view.watch, this._view), this._throttle);
}

Jarvis.Watcher.prototype.halt = function() {
    clearInterval(this._interval_id);
}
