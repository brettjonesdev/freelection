exports.castVote = function(req,res) {
	console.log( "Casting vote: " + req.param("id" ) + ", " + req.param( "electionId" ) );
};