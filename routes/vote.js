var dao = require( '../data/dao' );
var db = dao.db;
var _ = require( 'underscore' );

exports.castVote = function(req,res) {
	var candidateId = req.param("candidateId" );
	var electionId = req.param( "electionId" );
	var station = req.param( "station" );
	console.log( "castVote", req.body );
	
	if ( candidateId && electionId && station ) {
		db.save({
			type: 'vote',
			electionId: electionId,
			candidateId: candidateId,
			station: station
		}, function( err, doc ) {
			console.log( err, doc );
			if ( err ) {
				res.send(404, err );
			} else {
				res.send( {success: true} );
			}
		});
	} else {
		res.send(404, "somethings not right" );
	}
};	
	
exports.getResults = function(req,res) {
	var electionId = req.param( "id" );
	console.log( "get Results for election " + electionId );
	db.view( 'vote/byElection' , { key: electionId }, function(err, doc ) {
		if ( err ) {
			console.log( err );
			res.send(404, err );
		} else {
			
			var allVotes = _.pluck(doc, "value");
			
			var stations = _.pluck(allVotes, "station");
			stations = _.uniq(stations);
			
			var candidates = _.pluck(allVotes, "candidateId");
			candidates = _.uniq(candidates);
			
			var results = {};
			for ( var i = 0; i < stations.length; i++ ) {
				results[stations[i]] = {};
				for ( var j = 0; j < candidates.length; i++ ) {
					results[stations[i]][candidates[j]] = 0;
				}
			}
			console.log( results );
		}
	
	});
};