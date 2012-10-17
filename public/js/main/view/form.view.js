define(['baseView', 'backbone', 'underscore', 'jquery', 'validation', 'validateAll'], function(BaseView, Backbone, _, $) {
	return BaseView.extend( {
		
		originalEvents: {
			"click .save" : "save",
			"change input" : "update"
		},
		// Override this event hash in a child view
		additionalEvents: {},
		events : function() {
			return _.extend({},this.originalEvents,this.additionalEvents);
		},
		
		render: function() {
			this._render();
			Backbone.Validation.bind(this, {
				valid: this.valid,
				invalid: this.invalid
			});
		},
		
		initialize: function() {
			this._initialize();
		},
		_initialize: function() {
			_.bindAll( this );
		},
		
		update: function(e) {
			var el = $(e.currentTarget);
			var attr = el.attr( 'name' );
			var value = el.val();
			this.model.set( attr, value, { validateAll: false } );
		},
		
		invalid: function( view, attr, error ) {
			var input = view.$( "input[name=" + attr + "]" );
			input.closest( '.control-group' ).addClass( 'error' );
			input.siblings( '[data-error]' ).html( error );
		},
		
		valid: function( view, attr ) {
			var input = view.$( "input[name=" + attr + "]" );
			input.closest( '.control-group' ).removeClass( 'error' );
			input.siblings( '[data-error]' ).html( "" );
		},
		
		save: function(e) {
			e.preventDefault();
			var view = this;
			view.$( 'input' ).trigger( 'change' );
			if ( this.isSynced() ) {
				this.model.save(this.model.toJSON(), {
					wait: true, 
					success: function( response ) {
						view.trigger( 'save', response );
					}
				});
			}
		},
		
		isSynced: function() {
			var model = this.model;
			var synced = true;
			this.$( 'input' ).each( function( a, b ) {
				var attr = $( this ).attr( 'name' );
				var value = $( this ).val();
				if ( value != model.get( attr ) ) {
					synced = false;
				}
			});
			return synced;
		}
	});
});