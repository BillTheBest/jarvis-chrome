// maybe this would be in a component for thread?
define([
    'jquery',
    'underscore',
    'backbone',
    'jarvis',
    'text!templates/threads/tag_item.html'
], function($, _, Backbone, J, TagItemTemplate) {
    'use strict';

    var ThreadTagView = Backbone.View.extend({

        tagName: 'table',
        className: 'cf hX jarvisTag',
        template: _.template(TagItemTemplate),
        events: {
            'click span.hO': 'removeTag'
        },

        initialize: function() {
            _.bindAll(this, 'remove');
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON())).attr('cellpadding', '0');
            return this;
        },

        removeTag: function() {
            this.model.destroy({success: this.remove});
        }

    });

    return ThreadTagView;
});
