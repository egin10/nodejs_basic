//menambhakan node module package ==> routes (npm install routes)

var http = require('http');
var url = require('url');
var routes = require('routes')();

//daftar path router
routes.addRoute('/', function(req, res){
	res.writeHeader(200, {"Content-Type":"text/plain"});
	res.end("Index Page");
});

//'/profile/:id?' bisa ada parameter bisa hanya /profile/ 
// ? => opsional parameter
routes.addRoute('/profile/:id?', function(req, res){
	res.writeHeader(200, {"Content-Type":"text/plain"});
	res.end("Profile Page >> " + this.params.id); //this.params.id untuk menampilkan parameter yang dikirim
});

//'/user/:id' harus memberi parameter id jika tidak, maka tidak akan tampil
routes.addRoute('/user/:id', function(req, res){
	res.writeHeader(200, {"Content-Type":"text/plain"});
	res.end("Users Page >> " + this.params.id);
});

http.createServer(function(req, res){
	var pathName = url.parse(req.url).pathname; //mengambil pathname
	var match = routes.match(pathName); //untuk mencocokan dengan path yang didaftarkan pada router
	if(match){
		match.fn(req, res); //untuk mencocokan dengan path yang didaftarkan pada router
	}else{
		res.writeHeader(404, {"Content-Type":"text/plain"});
		res.end("Page Not Found!");
	}
}).listen(8888);

console.log("Server is running on PORT : 8888");