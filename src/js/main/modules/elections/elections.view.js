define( ['baseView','backbone', 'jquery', 'underscore', 'text!./elections.tmpl'], function( BaseView, Backbone, $, _, _template) {
	return BaseView.extend( {
		el : '#main',
		template: _template,
		events: {
			"click .next" : "load"
		},
		initialize: function() {
			_.bindAll(this);
		},
		load: function(e) {
			var id = this.$( "#electionId" ).val();
			window.location = "#vote/" + id;
		}

	});
	
});