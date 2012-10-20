var cradle = require('cradle');

if ( process.env.CLOUDANT_URL ) {
	var db = new(cradle.Connection)(process.env.CLOUDANT_URL, 80).database('elections');
} else {
	db = new(cradle.Connection)('http://127.0.0.1', 5984).database('elections');
}

db.exists(function (err, exists) {
    if (err) {
      console.log('error', err);
    } else if (exists) {
      console.log('db elections exists');
    } else {
      console.log('database elections does not exist. Creating...');
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