(function($, J, _, Backbone) {
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

    J.namespace('Views.ComposeView');

    J.Views.ComposeView = Backbone.View.extend({

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

            // insert tagbar into the compose view
            this.tagbar = new J.Views.TagBarView({
                $compose_id: this.$compose_id,
                $draft_id: this.$draft_id
            });

            this.$form.find('div.aoD.az6').after(this.tagbar.render().el);

            this.$compose_id.on('message:sent', this.handleSentMessage);

            //$.ajax({
                //type: 'GET',
                //url: 'http://www.jdev.com/api/drafts/',
                //beforeSend: function(xhrObject) {
                    //xhrObject.setRequestHeader('Authorization', 'Token f0fcdbc930d4aac159b8f58fb0d54d9c19f4a435');
                //},
            //})
                //.done(function(data) {
                    //debugger;
                    //console.log(data);
                //})
                //.fail(function(data) {
                    //console.log(data.responseJSON.detail);
                //});

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
                postData = {
                    thread_id: messageId,
                    recipients: details.to.concat(details.cc).concat(details.bcc),
                    tags: this.tagbar.tags.toJSON()
                }
                J.debug('jarvis message posted:', postData);
                this.tagbar.tags.updateStorageId(messageId, 'message_id');
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
})(window.jQuery, window.Jarvis, window._, window.Backbone);
