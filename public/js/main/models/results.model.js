define(['backbone', 'underscore','jquery'], function(Backbone,_,$) {
	return Backbone.Model.extend( {
		urlRoot: "/results"
	});
});