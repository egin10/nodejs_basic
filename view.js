var http = require('http');
var url = require('url');
var router = require('routes')();
var view = require('swig'); //module swig for view template

//add route
router.addRoute('/', function(req, res){
	var html = view.compileFile('./template/index.html')(); //untuk menampilkan file
	res.writeHeader(200, {"Content-Type":"text/html"});
	res.end(html);
});

router.addRoute('/contact', function(req, res){
	var html = view.compileFile('./template/contact.html')({
		title : "Contact Page"
	}); //untuk menampilkan file dan mengirim data JSON ke template
	res.writeHeader(200, {"Content-Type":"text/html"});
	res.end(html);
});

http.createServer(function(req, res){
	var pathName = url.parse(req.url).pathname;
	var match = router.match(pathName);
	if(match){
		match.fn(req, res);
	}else{
		res.writeHeader(404, {"Content-Type":"text/plain"});
		res.end("Page Not Found!");
	}
}).listen(8888);

console.log("Server running on PORT : 8888");