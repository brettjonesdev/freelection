define( ['backbone', 'underscore', 'util', 'validation'], function( Backbone, _, util) {
	return Backbone.Model.extend( {
		urlRoot: "/candidate",
		idAttribute: '_id',
		defaults: {
			
		},
		
		validation: {
			name: {
				required: true,
				msg: "Please enter a name for this Candidate"
			},
			
			party: {
				required: true,
				msg: "Please enter a Party for this Candidate"
			}
		}
	});
});