var cradle = require('cradle');

var db = new(cradle.Connection)('http://127.0.0.1', 5984).database('elections');

db.exists(function (err, exists) {
    if (err) {
      console.log('error', err);
    } else if (exists) {
      console.log('elections exists');
    } else {
      console.log('database does not exist. Creating...');
      db.create();
      console.log('database created');
    }
    
    db.save('_design/candidate', {
        views: {
          byId: {
            map: function (doc) { 
            	if (doc.type === 'candidate') { 
            		emit(doc._id, doc); 
        		}
        	}
          },
          byElectionId: {
        	  map: function(doc) {
        		  if ( doc.type === 'candidate' ) {
        			  emit( doc.electionId, doc );
        		  }
        	  }
          }
        }
      });
    
    db.save('_design/vote', {
        views: {
          byId: {
            map: function (doc) { 
            	if (doc.type === 'vote') { 
            		emit(doc._id, doc); 
        		}
        	}
          },
          byElection: {
        	  map: function( doc ) {
        		  if ( doc.type === 'vote' ) {
        			  emit( doc.electionId, doc );
        		  }
        	  }
          }
        }
      });
    
  });

exports.db = db;