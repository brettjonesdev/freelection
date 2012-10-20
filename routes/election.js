var dao = require( '../data/dao' );
var db = dao.db;
var _ = require( 'underscore' );

exports.getElectionInfo = function( req, res ) {
	var electionId = req.param('electionId');
	console.log( "getElectionInfo: " + electionId );
	db.get( electionId, function( err, doc ) {
		if ( err) {
			console.log( err );
			res.send(500, "Unable to retrieve election data");
		} else {
			console.log( doc );
			res.json( doc );
		}
	});
};

exports.postElection = function(req, res){
    console.log( "post election info" );
    var data = _.extend( { type: 'election' }, req.body );
    db.save( data, function(err, doc ) {
    	if (err) {
            console.log( "error saving election", err );
            res.send(500, "Unable to save election" );
        } else {
            console.log( "Saved election", doc );
            
            db.get( doc.id, function( err2, doc2 ) {
            	if ( err ) {
            		console.log( err2 );
            	} else {
            		console.log( "New election info: ", doc2 );
                    res.json( doc2 );
            	}
            });
        }
    });
};