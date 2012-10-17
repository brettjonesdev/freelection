define( ['jquery',
         'underscore',
         'util',
         'mockjax'], function($, _, util) {
	
	$.mockjax({
	    url: '/candidates',
	    type: 'GET',
	    responseTime: 150,
	    responseText: [
	    {
	    	id: "abc123",
	    	name: "Baraq Obama",
	    	party: "Democrat",
	    	description: "President of the United States"
	    },
	    {
	    	id: "abc456",
	    	name: "Mitt Romney",
	    	party: "Republican",
	    	description: "Republican Challenger, former Governor of Massachusetts"
	    },
	    {
	    	id: "abc789",
	    	name: "Ron Paul",
	    	party: "Libertarian",
	    	description: "The Underdog"
	    }]
	});
	
	$.mockjax({
	    url: '/candidate/*',
	    type: 'GET',
	    responseTime: 150,
	    responseText: {
	    	id: "abc123",
	    	name: "Baraq Obama",
	    	party: "Democrat",
	    	description: "Incumbent President"
	    }
	});
	
	$.mockjax({
	    url: '/candidate',
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
	    url: '/candidate/*',
	    type: 'PUT',
	    responseTime: 150,
	    response: function( request ) {
	    	var responseBody = JSON.parse( request.data );
	    	this.responseText = responseBody;	
	    }
	});
});