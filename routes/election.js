var dao = require( '../data/dao' );
var db = dao.db;
var _ = require( 'underscore' );

exports.getElectionInfo = function( req, res ) {
	var electionId = req.param('electionId');
	console.log( "getElectionInfo: " + electionId );
	db.get( electionId, function( err, doc ) {
		if ( err) {
			res.send(404, "Unable to retrieve election data");
		} else {
			console.log( doc );
			res.json( doc );
		}
	});
};

exports.postElection = function(req, res){
    console.log( "post election info" );
    console.log( process.env.CLOUDANT_URL );
    var data = _.extend( { type: 'election' }, req.body );
    db.save( data, function(err, doc ) {
    	if (err) {
            console.log( "erorr saving election", err );
            res.send(404, "Unable to save election" );
        } else {
            console.log( "Saved election", doc );
            res.json( doc );
        }
    });
};