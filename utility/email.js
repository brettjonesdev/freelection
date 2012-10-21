var email = require("emailjs");

var server = email.server.connect({
	user: process.env.SMTP_USER,
	password: process.env.SMTP_PASS,
	host:    "smtp.gmail.com",
	ssl:     true
});

exports.sendEmail = function( to, subject, body ) {
	server.send( {
		text:    body, 
		from:    "freelectionapp@gmail.com", 
		to:      to,
		subject: subject,
		attachment: [ {data:"<html>" + body + "</html>", alternative:true} ]
	}, function(err, message) { console.log(err || message); });
};