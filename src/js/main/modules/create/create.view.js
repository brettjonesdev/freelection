define( ['formView', 'backbone', 'jquery', 'underscore', 'text!./create.tmpl', 'models/election.model', 'validation', 'models/election.fixture'], 
		function( FormView, Backbone, $, _,  _template, Model) {
	return FormView.extend( {
		el : '#main',
		template: _template,
		model: new Model(),
		initialize: function() {
			this.on( 'save', this.afterSave );
		},
		
		afterSave: function(response) {
			window.location = "/#election/" + response.id;
		}
	});
});