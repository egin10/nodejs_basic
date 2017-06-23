var http = require('http'); //module nodejs for server, jadi gak perlu pakai ./nama module
var fs = require('fs'); //module file stream from nodejs

http.createServer(function(req, res){
	// console.log(req.url);

	//==== simple routing
	var kode = 0;
	var file = "";

	if(req.url == "/"){
		kode = 200;
		file = "index.html";
	}else if(req.url == "/contact"){
		kode = 200;
		file = "contact.html";
	}else{
		kode = 404;
		file = "404.html";
	}

	res.writeHead(kode, {"Content-Type" : "text/html"});
	fs.createReadStream('./template/' + file).pipe(res);
}).listen(8888);

console.log("Server is running on port : 8888 ....");