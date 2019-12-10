
var http = require('http');
 
var server = http.createServer(function (req, res) {
	res.setHeader("Access-Control-Allow-Origin","*");
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('hello');
})
 
server.listen(8000,'127.0.0.5');
console.log('Server running at http://127.0.0.5:8000/');