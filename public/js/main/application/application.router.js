define( ['backbone', 
		'jquery',
		'jqueryui',
		'underscore',
		'Application'], 
function(Backbone, $, ui, _, Application, PageManager, moduleDefinitions) {
	return Backbone.Router.extend({
		routes: {
			'home' : 'intro',
			'create' : 'create',
			'vote' : 'selectElection',
			'vote/:electionId' : 'vote',
			'results/:electionId' : 'results',
			'election/:electionId' : 'election',
			'*path' : 'intro',
		},
		
		intro: function() {
			this.loadPage( 'modules/intro/intro.view' );
		},
		
		create: function() {
			this.loadPage( 'modules/create/create.view' );
		},
		
		selectElection: function() {
			this.loadPage( 'modules/elections/elections.view' );
		},
		
		vote: function( electionId ) {
			require( ['modules/vote/vote.view'], function( VoteView ) {
				var view = new VoteView( {electionId: electionId} );
			});
		},
		
		results: function( electionId ) {
			require( ['modules/results/results.view'], function( View ) {
				var view = new View( {electionId: electionId} );
			});
		},
		
		election: function(electionId) {
			require( ['modules/election/election.view', 'models/election.model'], function( ElectionView, ElectionModel ) {
				var model = new ElectionModel( { _id: electionId });
				model.fetch( { success: function() {
					var view = new ElectionView( {model:model} );
					view.render();
				}});
			});
		},
		
		loadPage: function( viewFile ) {
			require( [viewFile], function( View ) {
				var view = new View();
				view.render();
			});
		}
	});
});