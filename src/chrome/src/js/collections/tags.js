(function($, J, _, Backbone, window) {
    'use strict';

    J.namespace('Collections.Tags');

    // this should be a collection specifically for draft messages
    J.Collections.Tags = Backbone.Collection.extend({

        model: J.Models.TagModel,
        // want a url attribute here that returns a dynamic url based on the collection id we init within "initialize"
        // this should be pointing to something like /jarvis/drafts/ + this.draft_id

        initialize: function(options) {

            _.bindAll(this, 'updateDraftId', '_updateDraftId', 'updateStorageId');

            // drop the compose id here, tag collections have to be init with draft_id
            this.$compose_id = options.$compose_id;
            this.$draft_id = options.$draft_id;

            // url should reference:
            //
            // jarvis/messages/drafts/<draft_id>/tags
            //
            // initialized with any tags that were added before we had a draft id

            this.localStorage = this.initLocalStorage();

            this.$draft_id.on('draft:save', this.updateDraftId);
        },

        initLocalStorage: function(storage_key, storage_key_type) {
            this.storage_key = 'jarvis:tags:';
            if (storage_key !== undefined && storage_key_type !== undefined) {
                this.storage_key = storage_key;
                this.storage_key_type = storage_key_type;
            } else if (this.$draft_id.val() !== 'undefined') {
                this.storage_key += this.$draft_id.val();
                this.storage_key_type = 'draft_id';
            } else {
                this.storage_key += this.$compose_id.val();
                this.storage_key_type = 'compose_id';
            }

            J.debug(
                'instantiating local storage...',
                'storage_key_type:',
                this.storage_key_type,
                'storage_key:',
                this.storage_key
            );

            return new Backbone.LocalStorage(this.storage_key);
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
            if (this.$draft_id === oldDraftId) {
                return;
            }

            window.clearInterval(this.intervalId);
            this.updateStorageId();
        },

        updateStorageId: function(storage_key, storage_key_type) {
            // fetch current records
            var records = this.localStorage.findAll();
            // clear old local storage
            this.localStorage._clear();
            // init new local storage
            this.localStorage = this.initLocalStorage(storage_key, storage_key_type);
            // init local storage with draft id
            _.each(records, function(record) {
                this.localStorage.create(record);
            }, this);
        }

    });

})(window.jQuery, window.Jarvis, window._, window.Backbone, window);
