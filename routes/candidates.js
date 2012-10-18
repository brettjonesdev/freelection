var dao = require( '../data/dao' );
var db = dao.db;
var _ = require( 'underscore' );

exports.getCandidates = function(req, res) {
	var electionId = req.param('id');
	console.log( "get candidates for election : " + electionId);
	db.view( 'candidate/byElectionId' , { key: electionId }, function(err, doc ) {
		if ( err ) {
			console.log(err);
			res.send( 404, err );
		} else {
			console.log( "Results:", doc );
			res.json( doc );
		}
	});
};

exports.getCandidateInfo = function(req, res) {
	console.log( "get candidate info for " + req.params[0]);
	//TODO
}; 

exports.updateCandidate = function(req, res) {
	console.log( "Update candidate: " + req.body.name);
	//TODO
};

exports.addCandidate = function(req, res) {
	var data = _.extend( { type: "candidate" }, req.body );
	console.log( "addCandidate", data);

	db.save( data, function(err,doc) {
		if ( err ) {
			console.log(err);
			res.send(404, err);
		} else {
			console.log(doc);
			res.json(doc);
		}
	});
};

exports.deleteCandidate = function(req, res) {
	var candidateId = req.param('candidateId');
	console.log( "delete candidate : " + candidateId);

	db.get( candidateId, function(err, doc ) {
		if ( err ) {
			console.log(err);
			res.send(404,err);
		} else {
			console.log(doc);
			var revision = doc._rev;
			db.remove( candidateId, revision, function(err,doc) {
				if ( err ) {
					console.log(err);
					res.send(404, err);
				} else {
					console.log(doc);
					res.json(doc);
				}
			});			
		}
	});
};
 