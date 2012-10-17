define( ['jquery',
         'underscore',
         'util',
         'mockjax'], function($, _, util) {
	
	$.mockjax({
	    url: '/election',
	    type: 'POST',
	    responseTime: 150,
	    response: function( request ) {
	    	var responseBody = JSON.parse( request.data );
	    	responseBody.id = util.guidGenerator();
	    	responseBody.modified = new Date();
	    	this.responseText = responseBody;
	    }
	});
	
	$.mockjax({
	    url: '/election/*',
	    type: 'GET',
	    responseTime: 150,
	    responseText: {
	    	id: "123456",
	    	name: "2012 United States Presidential Election",
	    	description: "2012 Presidential Election for Cambridge Elementary",
	    	email: "bjhoops1@gmail.com"
	    }
	});	
});