var email = require("emailjs");

var server = email.server.connect({
	user: "freelectionapp",
	password: "freelection2012",
	host:    "smtp.gmail.com", 
	ssl:     true
});

exports.sendEmail = function( to, subject, body ) {
	server.send({
			   text:    body, 
			   from:    "freelectionapp@gmail.com", 
			   to:      to,
			   subject: subject,
			   content: "text/html; charset=utf-8'"
		   }, function(err, message) { console.log(err || message); });
};