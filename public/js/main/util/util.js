define( ['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	return {
			stripNonAlpha: function( value ) {
				var alpha = /[^A-Za-z]/g;
				if ( value ) {
					return value.replace( alpha, '' );
				}
			},
			guidGenerator: function() {
			    var S4 = function() {
			       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
			    };
			    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
			},
			validEmail: function(email) { 
				var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    	return re.test(email);
		    }
		};
});