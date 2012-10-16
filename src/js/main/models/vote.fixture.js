define( ['jquery',
         'underscore',
         'util',
         'mockjax'], function($, _, util) {	
	$.mockjax({
	    url: '/castVote',
	    type: 'POST',
	    responseTime: 150,
	    responseText: {
	    	success: true
	    }
	});
});