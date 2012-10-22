define( ['Application',
         'baseView', 
         'backbone', 
         'underscore', 
         'jquery', 
         'text!./results.tmpl', 
         'models/results.model',
         'models/election.model',
         'models/candidate.collection',
         'handlebars',
         'charts'],
function(Application,BaseView, Backbone, _, $, _template, Model, ElectionModel, CandidateCollection, Handlebars, google) {
	return BaseView.extend( {
		el : '#main',
		template: _template,		
		initialize: function() {
			_.bindAll( this );
			this.model = new Model( { id: this.options.electionId } );
			this.election = new ElectionModel( { _id: this.options.electionId } );
			this.candidates = new CandidateCollection();
			this.candidates.fetch( {
				data: {
					id: this.options.electionId
				}
			});
			
			this.model.on( "change", this.modelLoad );
			this.election.on( "change", this.electionLoad );
			this.candidates.on( "change add reset", this.candidatesLoad );
			var view = this;
			google.load('visualization', '1', {packages:['table', 'corechart'], callback: this.loadData });
		},
		
		loadData: function() {
			this.model.fetch();
			this.election.fetch();
		},
		
		modelLoad: function() {
			this.modelLoaded = true;
			if ( this.electionLoaded && this.candidatesLoaded ) {
				this.render();
			}
		},
		
		candidatesLoad: function() {
			this.candidatesLoaded = true;
			if ( this.electionLoaded && this.modelLoaded) {
				this.render();
			}
		},
		
		electionLoad: function() {
			this.electionLoaded = true;
			if ( this.modelLoaded && this.candidatesLoaded) {
				this.render();
			}
		},
		
		render: function() {
			var template = Handlebars.compile( this.template);
			
			var totals = this.model.get( 'totals' );
			var most = 0;
			var winner = null;
			for ( var candidate in totals ) {
				if (totals[candidate] > most ) {
					most = totals[candidate];
					winner =  candidate;
				}
			}
			
			this.$el.html( template( {
				winner: winner,
				election: this.election.toJSON(),
				results: this.model.toJSON()
			}));
			
			this.drawTotals( totals );
			this.drawBreakdown( this.model.get( 'byStation' ) );
		},
		
		drawTotals : function(totals) {
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Candidate');
			data.addColumn('number', 'Votes');

			var rows = [];
			for ( var candidate in totals) {
				var votes = totals[candidate];
				rows.push([ candidate, votes, ]);
			}
			data.addRows(rows);

			var table = new google.visualization.Table(document.getElementById('totalsChart'));
			table.draw(data, {
				sortColumn : 1,
				sortAscending : false
			});
		},

		drawBreakdown : function(votesByStation) {
			var data = new google.visualization.DataTable();
			
			data.addColumn('string', 'Station');
			var candidates = this.candidates.toJSON();
			for ( var i = 0; i < candidates.length; i++ ){
				data.addColumn( 'number', candidates[i].name);
			}
			
			var rows = [];
			for ( var station in votesByStation ) {
				var row = [station];
				
				var candidateVotes = votesByStation[station];
				for ( var candidate in candidateVotes ) {
					var votes = candidateVotes[candidate];
					row.push(votes);
				}
				console.log( "Row", row );
				rows.push(row);
			}
			data.addRows(rows);
			
			var height = (50 + 75 * rows.length);
			var chart = new google.visualization.BarChart(document.getElementById( 'breakdownChart' ));
			chart.draw(data, {
				height: height,
				chartArea: {
					top: 10
				}
			});
		}
	});
});