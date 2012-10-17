exports.postElection = function(req, res){
    console.log( "post election info" );
    var electionId = req.body.id;
    
    res.json( {
		id: electionId,
		name: "2012 United States Presidential Election",
    	description: "2012 Presidential Election for Cambridge Elementary",
    	email: "bjhoops1@gmail.com"
	});
};

exports.getElectionInfo = function(req, res) {
	console.log( "get Election Info" );
	var electionId = req.params[0];
	
	res.json( {
		id: electionId,
		name: "US Presidential Election",
    	description: "2012 Presidential Election for Cambridge Elementary",
    	email: "bjhoops1@gmail.com"
	});
};