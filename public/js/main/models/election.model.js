define( ['backbone', 'underscore', 'util', 'validation'], function( Backbone, _, util) {
	return Backbone.Model.extend( {
		urlRoot: "/election",
		idAttribute: '_id',
		defaults: {
			name: "",
			email: "",
			description: ""
		},
		
		validation: {
	    	name: {
		    	 required: true,
		    	 msg: 'Please name this Election'
	    	},
	    	email: {
		    	required: true,
		    	pattern: 'email',
		    	msg: 'Please enter a valid Email address'
	    	}
	     }
	});
});