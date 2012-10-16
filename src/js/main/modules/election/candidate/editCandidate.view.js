define( ['Application', 'formView', 'backbone', 'jquery', 'underscore', 'bootstrap', 'text!./editCandidate.tmpl', 'models/candidate.model', 'models/candidate.fixture'], 
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
		
		selfDestruct: function() {
			this.remove();
			Application.trigger( 'edit-candidate-save', this.model );
		}
	});
});