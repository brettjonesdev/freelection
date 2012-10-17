define( ['Application', 'baseView', 'backbone', 'underscore', 'jquery', 'text!./vote.tmpl', 'models/election.model', 'models/candidate.collection', 'bootstrap'],
function( Application, BaseView, Backbone, _, $, _template, Model, CandidateCollection) {
	return BaseView.extend( {
		el: "#main",
		template: _template,
		model: new Model(),
		events: {
			"click a.select,tr.candidate" : "vote",
			"click a.confirm" : "castVote"
		},
		candidates: new CandidateCollection(),
		initialize: function(options) {
			_.bindAll( this );
			this.model.set( 'id', options.electionId );
			this.candidates.fetch( {
				data: {
					id: options.electionId
				}
			});
			
			this.model.on( 'change', this.render );
			this.candidates.on( 'reset add change', this.render);
			this.model.fetch();
		},
		render: function() {
			var template = Handlebars.compile( this.template );
			this.$el.html( template( { election: this.model.toJSON(), candidates: this.candidates.toJSON() }));
			this.$( '#confirm' ).modal( {show: false} );
		},
		
		vote: function(e) {
			var el = $(e.target).closest( ".candidate" );
			this.candidateId = el.data( 'id' );
			if ( this.candidateId ) {
				this.showConfirmDialog();
			}
			else {
				alert( "Please select a Candidate" );
			}
		},
		
		showConfirmDialog : function() {
			this.$( '#confirm' ).modal("show");
			this.$( '#candidateName' ).html( this.candidates.get( this.candidateId ).get( 'name' ) );
		},
		
		castVote: function() {
			$.ajax( {
				url: "/castVote",
				data: {
					electionId: this.model.get( 'id' ),
					id: this.candidateId
				},
				type: "POST",
				success: this.voteCast	
			});
		},
		
		voteCast: function() {
			this.$( "#confirm" ).modal( "hide" );
			alert( "Thank you for voting!" );
		}
	});
});