define( ['Application',
         'baseView', 
         'backbone', 
         'underscore', 
         'jquery', 
         'text!./election.tmpl', 
         'models/election.model', 
         'models/candidate.collection', 
         'text!./candidates.tmpl'],
function(Application,BaseView, Backbone, _, $, _template, Model, CandidateCollection, _candidatesTemplate) {
	return BaseView.extend( {
		el : '#main',
		template: _template,
		candidatesTemplate: _candidatesTemplate,
		model: new Model(),
		events: {
			"click #add" : "addCandidate",
			"click .remove" : "removeCandidate",
			"click .candidate" : "editCandidate"
		},
		
		initialize: function() {
			_.bindAll( this );
			this.model.on( 'change', this.render, this);
			this.candidates = new CandidateCollection();
			this.candidates.fetch({
				data: {
					id: this.model.id
				}
			});
			this.candidates.on( 'change add remove reset', this.refreshCandidates, this);
			Application.on( 'edit-candidate-save', this.reloadCandidates );
		},
		
		render: function() {
			this._render();
			
			if ( !this.modal ) {
				this.modal = this.$( '#candidateModal' ).modal( { show: false } );				
			}
		},
		
		reloadCandidates: function() {
			this.candidates.fetch({
				data: {
					id: this.model.id
				}
			});
		},
		
		refreshCandidates: function() {
			var template = Handlebars.compile( this.candidatesTemplate );     				
			this.$( '#candidates' ).html(template( this.candidates.toJSON() ) );
		},
		
		editCandidate: function( event ) {
			event.preventDefault();
			var id = $( event.currentTarget ).data( 'id' );
			
			Application.trigger( 'edit-candidate', { id: id, electionId: this.model.id });
		},
		
		removeCandidate: function( event ) {
			var id = $( event.target ).closest('.candidate' ).data( 'id' );
			var candidateModel = this.candidates.get( id );
			candidateModel.destroy();
			this.refreshCandidates();
			return false;
		},
		
		addCandidate: function() {
			Application.trigger( 'add-candidate', this.model.id );
			return false;
		}
		
	});
});