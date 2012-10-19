var express = require('express'), 
routes = require('./routes'), 
election = require('./routes/election'), 
candidates = require('./routes/candidates' ),
vote = require('./routes/vote' ),
http = require('http'), 
path = require('path'),
cradle = require('cradle');

var app = express();

exports.app = app;

app.configure(function() {
	app.set('port', process.env.PORT || 8080);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jshtml');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

app.get('/', function( req, res ) {
	res.sendfile( "public/index.html" );
});

app.post('/election', election.postElection);
app.get('/election/:electionId', election.getElectionInfo);

app.get('/candidates', candidates.getCandidates);
app.get('/candidate/:candidateId', candidates.getCandidateInfo);
app.put( '/candidate/:candidateId', candidates.updateCandidate );
app.delete( '/candidate/:candidateId', candidates.deleteCandidate );
app.post( '/candidate', candidates.addCandidate );

app.post( '/castVote', vote.castVote );
app.get( '/results/:id', vote.getResults );

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});
