define( ['backbone', 'underscore', 'jquery','models/candidate.model'], function(Backbone, _, $, Model) {
	return Backbone.Collection.extend( {
		model: Model,
		url: '/candidates',
		
		//receives weird couchDb object
		parse: function(response) {
			var models = [];
			for (var i = 0; i < response.length;i++ ) {
				var value = response[i].value;
				value.id = value._id;
				models.push( value );
			}
			return models;
		}
	});
});