
// create web server with node.js
// to run: node comments.js
// then go to http://localhost:8080/ in your browser
// to stop: Ctrl+C

var http = require('http');
var url = require('url');
var fs = require('fs');

var comments = [
	{ 
		name: 'John Doe',
		comment: 'Hello World!'
	},
	{ 
		name: 'Jane Doe',
		comment: 'Hi!'
	}
];

var server = http.createServer(function(req, res) {
	var url_parts = url.parse(req.url, true);

	if (url_parts.pathname == '/') {
		fs.readFile('./comments.html', function(err, data) {
			res.end(data);
		});
	} else if (url_parts.pathname == '/comments') {
		res.end(JSON.stringify(comments));
	} else if (url_parts.pathname == '/add_comment') {
		var name = url_parts.query.name;
		var comment = url_parts.query.comment;

		comments.push({name: name, comment: comment});
		res.end('Comment added!');
	} else {
		res.end('Not found!');
	}
});

server.listen(8080);
console.log('Server is running at http://localhost:8080/');






