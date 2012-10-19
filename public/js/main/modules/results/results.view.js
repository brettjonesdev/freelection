define( ['Application',
         'baseView', 
         'backbone', 
         'underscore', 
         'jquery', 
         'text!./results.tmpl', 
         'models/results.model',
         'models/election.model',
         'handlebars'],
function(Application,BaseView, Backbone, _, $, _template, Model, ElectionModel, Handlebars) {
	return BaseView.extend( {
		el : '#main',
		template: _template,		
		initialize: function() {
			_.bindAll( this );
			this.model = new Model( { id: this.options.electionId } );
			this.election = new ElectionModel( { id: this.options.electionId } );
			this.model.on( "change", this.render );
			this.election.on( "change", this.render );
			this.model.fetch();
			this.election.fetch();
		},
		
		render: function() {
			var template = Handlebars.compile( this.template);
			this.$el.html( template( {
				election: this.election.toJSON(),
				results: this.model.toJSON()
			}));
		}
	});
});