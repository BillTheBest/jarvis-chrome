define([
    'jquery',
    'underscore',
    'backbone',
    'jarvis',
    'models/draft',
    'models/message',
    'views/tagbar'
], function($, _, Backbone, J) {
    'use strict';

    // everytime we detect a gmailr draft event, we want to save the draft of our tags/mentions
    //
    // when we load a message we want to load any mentions/tags associated with it
    //
    // we want to:
    //  - add a tagbar to the message
    //  - record tags when they're written in the tagbar
    //  - record tags when they're written in the body
    //  - record mentions when they're written in the body

    var ComposeView = Backbone.View.extend({

        el: 'div.dw div.nH > div.nH > div.no div.AD',

        // TODO: bind to "Trash" icon, so we can destroy the view and any models associated withit

        //events: {
            //// compose send button
            //'click .T-I.J-J5-Ji.aoO.T-I-atl.L3': 'handleSendButton'
            ////'keypress .editable': 'handleKeyPress'
        //},

        initialize: function(options) {

            _.bindAll(this, 'handleSentMessage', '_handleSentMessage');

            this.$compose_id = options.$compose_id;
            this.$compose = $(this._findElByComposeId());

            J.debug('initializing compose view for:', this.$compose_id.val());

            this.$form = this.$compose.find('form');
            this.$draft_id = this.$form.find(':input[name="draft"]');
            this.$recipientsContainer = this.$form.find('.aoD.hl');
            this.$subjectContainer = this.$form.find('input[name="subjectbox"]');
            this.$body = this.$compose.find('.editable');

            var draftId = this.$draft_id.val();
            if (draftId !== 'undefined') {
                draftId = parseInt(draftId, 16);
            } else {
                draftId = null;
            }

            this.draft = new DraftModel({
                user: J.user_id,
                draft_id: draftId,
            }, {
                $compose_id: this.$compose_id,
                $draft_id: this.$draft_id
            });
            if (this.draft.get('draft_id')) {
                this.draft.fetch();
            }

            // insert tagbar into the compose view
            this.tagbar = new TagBarView({
                $compose_id: this.$compose_id,
                $draft_id: this.$draft_id,
                draft: this.draft,
            });

            this.$form.find('div.aoD.az6').after(this.tagbar.render().el);

            this.$compose_id.on('message:sent', this.handleSentMessage);

        },

        handleSentMessage: function(e, details) {
            // check to see if the window is still visible, if it is, the
            // message isn't being sent, and gmail is going to raise an error
            // to the user (no recipients entered for instance)
            if (this.$el.is(':visible')) {
                return;
            }

            // maybe put these into an object so we can namespace them better?
            this.intervalId = window.setInterval(this._handleSentMessage, 1000, details);
        },

        _handleSentMessage: function(details) {

            // check to see if the message is still being sent
            var messageStatusBar = $('div.vY div.vX.UC div.J-J5-Ji div.vh span'),
                messageId = $('div.nH div.b8.UC div.J-J5-Ji div.vh span').attr('param'),
                postData;

            if (messageStatusBar.is(':visible')) {
                return;
            }

            window.clearInterval(this.intervalId);
            if (!messageId) {
                J.debug('messageId not found, compose_id:', this.$compose_id.val());
            } else {
                var message = new MessageModel({
                    thread_id: messageId,
                    draft_id: this.draft.id,
                    recipients: details.to.concat(details.cc).concat(details.bcc),
                    tags: this.draft.tags.toJSON(),
                });
                message.save();
            }
        },

        //handleKeyPress: function(e) {
            //// support for 1 word tags
            ////  - on #, init a TagModel and jQuery autocomplete
            ////  - while we're working with a TagModel, add any keystrokes other than 32 (space)
            //if (e.which === J.HASHTAG_KEY) {
                //debugger;
                //e.preventDefault();
                ////this.$body.append('<button contenteditable="false" tabindex=-1 class="Ug"><span>#</span>something</button>');
            //}

        //},

        _findElByComposeId: function() {
            return _.find(this.$el, function(item) {
                return $(item).find('input[value="' + this.$compose_id.val() + '"]').length;
            }, this);
        }

    });

    return ComposeView;

});
