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
				res.send(500, err );
			} else {
				res.send( {success: true} );
			}
		});
	} else {
		res.send(404, "somethings not right" );
	}
};	
	
exports.getResults = function(req,res) {
	var electionId = req.param( "_id" );
	console.log( "get Results for election " + electionId );
	
	var allVotes;
	var allCandidates;
	
	db.view( 'candidate/byElectionId' , { key: electionId }, function(err, doc ) {
		if ( err ) {
			console.log(err);
			res.send( 500, err );
		} else {
			console.log( "All Candidates", doc );
			if ( allVotes ) {
				generateResults( allVotes, candidates );
			}
		}
	});
	
	db.view( 'vote/byElection' , { key: electionId }, function(err, doc ) {
		if ( err ) {
			console.log( err );
			res.send(404, err );
		} else {
			allVotes = _.pluck(doc, "value");
			if ( allCandidates ) {
				generateResults( allVotes, allCandidates );
			}
		}
	
	});
};

function generateResults( allVotes, candidates ) {
	var stations = _.pluck(allVotes, "station");
	stations = _.uniq(stations);
}

