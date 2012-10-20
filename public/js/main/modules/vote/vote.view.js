define( ['Application', 'baseView', 'backbone', 'underscore', 'jquery', 'text!./vote.tmpl', 'models/election.model', 'models/candidate.collection', 'bootstrap'],
function( Application, BaseView, Backbone, _, $, _template, ElectionModel, CandidateCollection) {
	return BaseView.extend( {
		el: "#main",
		template: _template,
		model: new Backbone.Model(),
		election: new ElectionModel(),
		events: {
			"click tr.candidate" : "vote",
			"click a.confirm" : "castVote",
			"click a.saveStationName" : "setStationName"
		},
		candidates: new CandidateCollection(),
		initialize: function(options) {
			_.bindAll( this );
			this.election.set( '_id', options.electionId );
			this.candidates.fetch( {
				data: {
					id: options.electionId
				}
			});
			
			this.election.on( 'change', this.render );
			this.model.on( 'change', this.render );
			this.candidates.on( 'reset add change', this.render);
			this.election.fetch();
			Application.on( 'save-station-name', this.setStationName, this );
		},
		render: function() {
			var template = Handlebars.compile( this.template );
			this.$el.html( template( { stationName: this.model.get( 'stationName' ), election: this.election.toJSON(), candidates: this.candidates.toJSON() }));
			this.$( '#confirm' ).modal( {show: false} );			
		},
		
		forceStation: function() {
			alert( "Please enter a name for this Polling Station!" );
		},
		
		vote: function(e) {
			e.preventDefault();
			if ( !this.model.get( 'stationName' ) ) return this.forceStation();
			var el = $(e.target).closest( ".candidate" );
			this.candidateId = el.data( 'id' );
			this.candidateName = el.data('name');
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
					electionId: this.election.id,
					candidateId: this.candidateId,
					candidate: this.candidateName,
					station: this.model.get( 'stationName' )
				},
				type: "POST",
				success: this.voteCast	
			});
		},
		
		voteCast: function() {
			this.$( "#confirm" ).modal( "hide" );
			alert( "Thank you for voting!" );
		},
		
		setStationName: function() {
			var stationName = this.$( 'input#stationName' ).val();
			this.model.set('stationName', stationName );
		}
	});
});