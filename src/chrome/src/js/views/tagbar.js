define([
    'jquery',
    'underscore',
    'backbone',
    'tag_it',
    'jarvis'
], function($, _, Backbone, TagIt, J) {
    'use strict';

    var TagBarView = Backbone.View.extend({

        tagName: 'div',
        className: 'aoD az6 tag-bar',

        // XXX move out to template
        template: _.template('<input tabindex="1" class="aoT" placeholder="Tags" /></div>'),

        events: {
            'keypress input': 'handleKeyPress'
        },

        initialize: function(options) {
            _.bindAll(this, 'populateTagBar');

            this.$compose_id = options.$compose_id;
            this.$draft_id = options.$draft_id;
            this.draft = options.draft;
            J.debug('adding tagbar for:', this.$compose_id.val());
        },

        render: function() {
            this.$el.html(this.template());
            this.$input = this.$('input');
            var sampleTags = ['c++', 'java', 'php', 'coldfusion', 'javascript', 'asp', 'ruby', 'python', 'c', 'scala', 'groovy', 'haskell', 'perl', 'erlang', 'apl', 'cobol', 'go', 'lua'];
            // instantiate tag-it
            this.$input.tagit({
                placeholderText: '+Tag',
                tabIndex: 1,
                removeConfirmation: true,
                availableTags: sampleTags,
                onTagExists: this.handleTagExists.bind(this),
                afterTagAdded: this.handleTagAdded.bind(this),
                afterTagRemoved: this.handleTagRemoved.bind(this)
            });
            this.initializingTags = false;
            // add existing tags to tag-it
            if (this.draft.tags.persistent) {
                this.initializingTags = true;
                this.draft.tags.fetch({success: this.populateTagBar});
            }
            return this
        },

        handleKeyPress: function() {
            J.debug('keypress in tagbar for:', this.$compose_id.val());
        },

        handleTagExists: function(e, ui) {
            J.debug('tag exists:', ui.tagLabel);
        },

        handleTagAdded: function(e, ui) {
            var tag = {
                name: ui.tagLabel,
                company: J.company_id,
                draft: this.draft
            };
            J.debug('adding tag:', tag);
            if (this.initializingTags) {
                this.draft.tags.add(tag, {silent: true});
            } else {
                if (this.draft.tags.persistent) {
                    this.draft.tags.create(tag);
                } else {
                    this.draft.tags.add(tag);
                }
            }
        },

        handleTagRemoved: function(e, ui) {
            J.debug('removing tag:', ui.tagLabel);
            var tag = this.draft.tags.findWhere({name: ui.tagLabel});
            if (this.draft.tags.persistent) {
                tag.destroy();
            } else {
                this.draft.tags.remove(tag);
            }
        },

        populateTagBar: function(collection, response, options) {
            collection.each(function(tagModel) {
                // XXX look into adding other attributes here like id somehow
                this.$input.tagit('createTag', tagModel.get('name'));
            }, this);
            this.initializingTags = false;
        }

    });

    return TagBarView;

});
