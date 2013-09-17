define([
    'jquery',
    'underscore',
    'backbone',
    'jarvis',
    'collections/draft_tags'
], function($, _, Backbone, J, DraftTagsCollection) {
    'use strict';

    var DraftModel = Backbone.Model.extend({

        urlRoot: J.DRAFTS_API_ENDPOINT,

        url: function() {
            var base = Backbone.Model.prototype.url.apply(this, arguments);
            // ensure we always have trailing '/'
            // XXX we'll need this in every model so we should extend
            // Backbone.Model some where so we can use our own
            return base + (base.charAt(base.length - 1) === '/' ? '' : '/');
        },

        initialize: function(attributes, options) {
            _.bindAll(this, 'updateDraftId', '_updateDraftId', 'persistTags');

            this.$compose_id = options.$compose_id;
            this.$draft_id = options.$draft_id;

            this.tags = new DraftTagsCollection([], {
                $compose_id: this.$compose_id,
                $draft_id: this.$draft_id,
                draft: this
            });
            if (attributes.draft_id) {
                this.tags.persistent = true;
            }

            this.$draft_id.on('draft:save', this.updateDraftId);
        },

        getJarvisDraftId: function() {
            var draft_id = this.get('draft_id');
            if (draft_id && typeof draft_id === 'string') {
                // XXX draft should be able to handle hex value as well since js can't handle 64 bit
                draft_id = parseInt(draft_id, 16);
            }
            return draft_id;
        },

        fetch: function(options) {
            var options = options ? _.clone(options): {};
            options.url = _.result(this, 'url') + '?draft_id=' + this.getJarvisDraftId();
            return Backbone.Model.prototype.fetch.apply(this, [options]);
        },

        parse: function(response, options) {
            if (response.results) {
                return response.results[0];
            }
            return response;
        },

        persistTags: function(model, response, options) {
            model.tags.persistent = true;
            _.invoke(model.tags.toArray(), 'save');
        },

        updateDraftId: function(e, oldDraftId) {
            // when a new message is saved as a draft, we update the storage to
            // reference the draft id instead of the compose id
            //
            // wait until the draft id is updated
            // while loop? setInterval until we can find it?
            //
            this.intervalId = window.setInterval(this._updateDraftId, 1000, oldDraftId);
        },

        _updateDraftId: function(oldDraftId) {
            // set some sort of max on this?
            //
            // the draft id changes each time we save a new draft
            J.debug('new draft id:', this.$draft_id.val(), 'old draft id:', oldDraftId);
            if (this.$draft_id.val() === oldDraftId) {
                return;
            }

            window.clearInterval(this.intervalId);
            var draftId = parseInt(this.$draft_id.val(), 16);
            if (!this.id) {
                this.save({draft_id: draftId}, {success: this.persistTags});
            } else {
                this.save({draft_id: draftId}, {patch: true});
            }
        },


    });

    return DraftModel;

});
