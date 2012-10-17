exports.getCandidates = function(req, res) {
	console.log( "get candidates for " + req.param('id'));
	
	res.json([ {
		id : "abc123",
		name : "Baraq Obama",
		party : "Democrat",
		description : "President of the United States"
	}, {
		id : "abc456",
		name : "Mitt Romney",
		party : "Republican",
		description : "Republican Challenger, former Governor of Massachusetts"
	}, {
		id : "abc789",
		name : "Ron Paul",
		party : "Libertarian",
		description : "The Underdog"
	} ]);
};

exports.getCandidateInfo = function(req, res) {
	console.log( "get candidate info for " + req.params[0]);
	res.json({
		id : "xyz456",
		name : "Your Mother",
		party : "Republican",
		description : "President of the United States"
	});
}; 

exports.updateCandidate = function(req, res) {
	console.log( "Update candidate: " + req.body.name);
	res.json(req.body);
};

exports.addCandidate = function(req, res) {
	var id = "ABC123Xyz";
	console.log( "Add new Candidate: " + req.body.name);
	res.json(req.body);
}; 