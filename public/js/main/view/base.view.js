define( ['backbone', 'underscore', 'jquery', 'handlebars', 'jqueryui', 'bootstrap'], function(Backbone, _, $, Handlebars ) {
	var BaseView = Backbone.View.extend( {
		_engine: "handlebars",
		_render: function(event) {
			this._cleanUIComponents();
			
			if ( this._engine == 'handlebars') {
    			var template = Handlebars.compile( this.template );     				
			} else if ( this._engine == 'underscore' ) {
				template = _.template( this.template );
			}
			
			if ( this.collection ) {
				this.$el.html(template( this.collection.toJSON() ) );
			}
			else {
				this.$el.html(template( ( this.model ? this.model.toJSON() : {} ) ) );
			}
			
			this._handleUIElements();
			this.trigger( 'render' );
			return this;
		}, 
		
		_cleanUIComponents: function() {
			//this.$( '.modal' ).modal( 'hide' );
		},
		
		_handleUIElements: function() {
			this.$el.find( '.add-ui-datepicker' ).datepicker();
		},
		
		render: function(event) {
			return this._render(event);
		},
		
		_error: function( model, errors ) {
			var view = this;
			view.$( '[data-validation]' ).each( function() {
				var attr = $( this ).data( 'validation' );
				view.$( '[data-validation=' + attr + ']' ).empty().html( errors[attr] );	        					
			});
		},	        		
		error: function( model, errors ) {
			this._error(model, errors);
		}
	});
	
	return BaseView;
});