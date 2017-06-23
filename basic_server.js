var http = require('http'); //module nodejs for server, jadi gak perlu pakai ./nama module

http.createServer(function(req, res){
	// console.log(req.url);
	res.writeHead(200, {"Content-Type" : "text/plain"});
	res.write("Server NodeJs Basic!\n");
	res.write("You are request : " + req.url);
	res.end();
}).listen(8888);

console.log("Server is running on port : 8888 ....");