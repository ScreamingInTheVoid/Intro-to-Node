var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req,res){
	var query = url.parse(req.url, true);
	var filename = "."+query.pathname;
	if(filename == './' ){
		filename = './index.html';
	}
	if(!filename.includes('.html') && !filename.includes('.ico')){
		filename = filename + '.html';
	}
	console.log('filename = '+filename);
	fs.readFile(filename, function(err, data){
		if(err){
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not Found");
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		console.log("Incoming! "+req.url);
		return res.end();
	});
	
}).listen(8080);

console.log("Server Listening on Port 8080...");