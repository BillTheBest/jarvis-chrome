(function($, J, _, Backbone) {
    'use strict';

    J.namespace('Views.TagBarView');

    J.Views.TagBarView = Backbone.View.extend({

        tagName: 'div',
        className: 'aoD az6 tag-bar',

        template: _.template('<input tabindex="1" class="aoT" placeholder="Tags" /></div>'),

        events: {
            'keypress input': 'handleKeyPress'
        },

        initialize: function(options) {

            this.$compose_id = options.$compose_id;
            this.$draft_id = options.$draft_id;
            J.debug('adding tagbar for:', this.$compose_id.val());

            // we only init this if we have a draft id,
            // add listener to draft::save to instantiate the collection
            // if we don't have a draft id, tags should be added to
            // 'tags-to-sync' or something, these will be passed along with the
            // draft id to J.Collections.DraftTags
            this.tags = new J.Collections.Tags({
                $compose_id: this.$compose_id,
                $draft_id: this.$draft_id
            });
            this.tags.fetch();

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
            // add existing tags to tag-it
            this.initializingTags = true;
            this.tags.each(function(tagModel) {
                this.$input.tagit('createTag', tagModel.get('name'));
            }, this);
            this.initializingTags = false;
            return this
        },

        handleKeyPress: function() {
            J.debug('keypress in tagbar for:', this.$compose_id.val());
        },

        handleTagExists: function(e, ui) {
            J.debug('tag exists:', ui.tagLabel);
        },

        handleTagAdded: function(e, ui) {
            if (!this.initializingTags) {
                J.debug('adding tag:', ui.tagLabel);
                this.tags.create({name: ui.tagLabel});
            }
        },

        handleTagRemoved: function(e, ui) {
            J.debug('removing tag:', ui.tagLabel);
            this.tags.findWhere({name: ui.tagLabel}).destroy();
        }

    });
})(window.jQuery, window.Jarvis, window._, window.Backbone);
