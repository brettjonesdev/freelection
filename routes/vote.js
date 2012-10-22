var dao = require( '../data/dao' );
var db = dao.db;
var _ = require( 'underscore' );

exports.castVote = function(req,res) {
	var candidateId = req.param("candidateId" );
	var candidate = req.param("candidate" );
	var electionId = req.param( "electionId" );
	var station = req.param( "station" );
	console.log( "castVote", req.body );
	
	if ( candidateId && electionId && station ) {
		db.save({
			type: 'vote',
			electionId: electionId,
			candidateId: candidateId,
			candidate: candidate,
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
	var electionId = req.param( "id" );
	console.log( "get Results for Election: " + electionId );
	
	var allVotes;
	var allCandidates;
	
	db.view( 'candidate/byElectionId' , { key: electionId }, function(err, doc ) {
		if ( err ) {
			console.log(err);
			res.send( 500, err );
		} else {
			allCandidates = _.pluck( doc, "value" );
			if ( allVotes ) {
				generateResults( allVotes, allCandidates );
			}
		}
	});
	
	db.view( 'vote/byElection' , { key: electionId }, function(err, doc ) {
		if ( err ) {
			console.log( err );
			res.send(500, err );
		} else {
			allVotes = _.pluck(doc, "value");
			if ( allCandidates ) {
				var results = generateResults( allVotes, allCandidates );
				res.send(results);
			}
		}
	
	});
};

function generateResults( allVotes, candidates ) {
	var stations = _.pluck(allVotes, "station");
	stations = _.uniq(stations);
	
	console.log( "Candidates", candidates );
	var votesByStation = initializeVotesByStationObject( stations, candidates );
	var totals = initializeTotalsObject(candidates);
	
	_.each( allVotes, function(vote) {
		if ( !vote.station || !vote.candidate ) {
			console.log( "Invalid vote", vote );
		} else {
			votesByStation[vote.station][vote.candidate]++;
			totals[vote.candidate]++;			
		}
	});
	
	return {
		totals: totals,
		byStation: votesByStation
	};
}

function initializeTotalsObject(candidates) {
	var totals = {};
	_.each( candidates, function( candidate ) {
		totals[candidate.name] = 0;
	});
	return totals;
}

function initializeVotesByStationObject(stations,candidates) {
	var votesByStation = {};
	_.each( stations, function(station) {
		votesByStation[station] = {};
		_.each( candidates, function( candidate ) {
			votesByStation[station][candidate.name] = 0;
		});
	});
	return votesByStation;
}