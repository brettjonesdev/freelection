define(['jquery', 'jqueryui', 'bootstrap', 'underscore', 'backbone', 'util', 'handlebars', 'application/application.model', 'fixture', 'datejs', 'validateAll'], 
function($, ui, bootstrap, _, Backbone, util, Handlebars, Model) {
	/*Singleton*/    
	var instance = null;
    
    function Application() {
        if(instance !== null) {
        	throw new Error("Cannot instantiate more than one Application, use Application.getInstance()");
        } 
        
        this.initialize();
    }
    
	Application.prototype = {
		initialize: function() {
			this.model = new Model();
        	
        	_.extend( this, Backbone.Events );
    		
    		this.wireEvents();
        },
        
        wireEvents: function() {
			this.on( 'edit-candidate', this.editCandidate, this );
			this.on( 'add-candidate', this.addCandidate, this );
        },
        
        addCandidate: function(electionId) {
        	if ( this.candidateView ) {
        		this.candidateView.remove();
			}
        	var Application = this;
			require( ['modules/election/candidate/editCandidate.view'], function( CandidateView) {
				Application.candidateView = new CandidateView( { electionId : electionId } );
				Application.candidateView.render();
				$( 'body' ).append( Application.candidateView.$el );	
			});
		},
		
		editCandidate: function( options ) {
			if ( Application.candidateView ) {
				Application.candidateView.remove();
			}
			var candidateId = options.id;
			require( ['modules/election/candidate/editCandidate.view', 'models/candidate.model'], function( CandidateView, CandidateModel ) {
				var model = new CandidateModel( { id: candidateId });
				model.fetch( { success: function() {
					Application.candidateView = new CandidateView( {model:model, electionId: options.electionId} );
					Application.candidateView.render();
					$( 'body' ).append( Application.candidateView.$el );
				}});
			});
		},
        
        start: function() {
        	if ( (typeof MODULE_MODE !== 'undefined' ) && MODULE_MODE ) {
        		require( ['modules/module.router'], function( Router ) {
        			new Router();
        			Backbone.history.start({pushState:false});
        		});
        	}
        	else {
            	var dependencies = ['application/application.router',
            	                    'application/application.view',
            	                    'fixture']; 
            	
            	if ( (typeof DEVELOPMENT_MODE !== 'undefined' ) && DEVELOPMENT_MODE ) {
            		dependencies.push('allFixtures');
            	}
            	
            	require(dependencies, function( Router, ApplicationView ) {
            		Application.view = new ApplicationView().render();
        			new Router();
    	        	Backbone.history.start({pushState:false});	        		
            	});
        		
        	}
		}
    };
    
    Application.getInstance = function(){
        if(instance === null){
            instance = new Application();
        }
        return instance;
    };
    
    return Application.getInstance();
});