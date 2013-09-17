define([
    'jquery',
    'underscore',
    'backbone',
    'jarvis',
    'models/thread',
    'views/threads/tag',
    'text!templates/threads/tag_table.html'
], function($, _, Backbone, J, ThreadModel, ThreadTagView, TagTableTemplate) {
    'use strict';

    var ThreadView = Backbone.View.extend({

        el: 'div.AO > div.Tm.aeJ > div.aeF > div.nH div.nH.g.id',
        labelSpan: 'div.nH > h1.ha span.J-J5-Ji',
        labelTables: 'div.nH > h1.ha table.cf.hX',
        template: _.template(TagTableTemplate),

        initialize: function(options) {
            // XXX this might not be there if you load to a specific message
            this.$labels = $(this.$el.find(this.labelTables)[0]);
            this.thread = new ThreadModel({
                thread_id: options.thread_id
            });
            this.thread.fetch();

            this.listenTo(this.thread.tags, 'reset', this.addAll);
            this.render();
        },

        render: function() {
            $(this.labelSpan).after(this.template());
        },

        addOne: function(tag) {
            var view = new ThreadTagView({model: tag});
            $('#tag-list').append(view.render().el);
            //this.$labels.before(
                //view.render().el);
        },

        addAll: function(tags) {
            tags.each(this.addOne, this);
        },

    });

    return ThreadView;

});
