/* WatcherView for the "Compose" view.
 *
 * Will watch the Gmail DOM for the a compose window to appear. When a compose
 * window appears, we'll create a compose view to monitor it, and continue to watch for others
 *
 */

Jarvis.namespace('WatcherView');

Jarvis.WatcherView.Compose = function() {

  // the element we're searching for in order to bind
  this._bind_selector = 'div.dw div.nH > div.nH > div.no div.AD';

  return this;
}

Jarvis.WatcherView.Compose.prototype.watch = function() {
    var self = this;

    // watch for the element
    if ($(this._bind_selector).length) {

        // more than one compose view can be present on the DOM at a time
        var $composeViews = $(this._bind_selector);

        // iterate over compose views checking to see if we need to create a compose view for it
        _.each($composeViews, function(view) {
            if (!$(view).data('bound')) {
                var $compose_id = $(view).find(':input[name="composeid"]');
                $(view).data('bound', true);
                // want this view to be hidden and we want to append it to the DOM?
                new Jarvis.Views.ComposeView({$compose_id: $compose_id});
            }
        });
    }
}

Jarvis.WatcherView.Compose.prototype.insertElements = function(composeId) {
    // if we've found the compose view, we want to insert our tag bar
    // maybe have someway we can iterate through templates we're inserting?

    // abstract aoD.az6 to some variable we can reference, need everything to be really modular so we can adapt to gmail style changes
    var appendAfter = 'div.' + this._additional_class + ' form div.aoD.az6',
    // maybe store some index we can use to reference this specific tagbar?
    // need to be able to handle multiple tagbars for multiple open new
    // messages
        tagbarContent = '<div class="aoD az6"><input class="aoT" placeholder="Tags" /></div>';

    window.Jarvis.debug('inserting elements after: ' + appendAfter);
    $(appendAfter).after(tagbarContent);
}

Jarvis.WatcherView.Compose.prototype.bindElements = function() {
    var self = this;

    $('div.' + this._additional_class).on('keypress', 'div.Am.Al.editable.LW-avf', function(event) {

        // handle hashtags
        if (event.which === window.Jarvis.HASHTAG_KEY) {
            window.Jarvis.debug('user is typing a reply with a hashtag');
        }

        if (event.which === window.Jarvis.MENTION_KEY) {
            window.Jarvis.debug('user is typing a reply with a mention');
        }

    });
}
