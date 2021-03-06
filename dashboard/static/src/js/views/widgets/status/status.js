openerp.unleashed.module('dashboard',function(dashboard, _, Backbone, base){


    var View = Marionette.ItemView;

    var WidgetStatus = View.extend({
        
        template: 'Dashboard.widget.status',

        events: {
            'click a.metric': 'openMetric'
        },
        
        modelEvents: {
            'change:updated_at': 'render'
        },

        initialize: function(options){
            this.search = options.search;
        },

        serializeData: function(){
            var updated_at = this.model.get('updated_at');
            return {
                metrics: this.collection.toArray(),
                updated_at: updated_at ? updated_at.format('LT') : base._t('not updated yet')
            };
        },
        
        // UI Events
        
        openMetric: function(e){
            e.preventDefault();
            var $clicked = $(e.currentTarget),
            	metric = this.collection.get($clicked.attr('metric-id'));

            dashboard.trigger('open:list', metric, this.search);
        }
    });

    dashboard.views('WidgetStatus', WidgetStatus);

});