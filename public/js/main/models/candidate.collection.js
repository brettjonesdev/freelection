define( ['backbone', 'underscore', 'jquery','models/candidate.model'], function(Backbone, _, $, Model) {
	return Backbone.Collection.extend( {
		model: Model,
		url: '/candidates'
	});
});