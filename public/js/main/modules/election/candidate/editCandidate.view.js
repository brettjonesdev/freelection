define( ['Application', 'formView', 'backbone', 'jquery', 'underscore', 'bootstrap', 'text!./editCandidate.tmpl', 'models/candidate.model'], 
function(Application, FormView, Backbone, $, _, bootstrap, _template, Model){
	return FormView.extend( {
		tagName: "div",
		className: "modal",
		template: _template,
		model: new Model(),
		additionalEvents: {
			"click .save" : 'save'
		},
		
		initialize: function() {
			this.on( 'save', this.selfDestruct );
		},
		render: function() {
			this._render();
			Backbone.Validation.bind(this, {
				valid: this.valid,
				invalid: this.invalid
			});
			this.$el.modal();
		},
		
		selfDestruct: function() {
			this.$el.modal( 'hide' );
			this.remove();
			Application.trigger( 'edit-candidate-save', this.model );
		}
	});
});