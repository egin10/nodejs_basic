var http = require('http');
var url = require('url');
var routes = require('routes')();
var qs = require('querystring');
var	view = require('swig');
var mysql = require('mysql'); //npm install mysql
var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "",
	database : "nodejs",
	port : 3306
});

//database SQL file : nodejs.sql

//show all data in database
routes.addRoute('/', function(req, res){
	connection.query("select * from mhs", function(err, rows, field){
		if(err) throw err;
		
		var html = view.compileFile("./template/index_crud.html")({
			title : "Data Mahasiswa",
			data : rows
		});

		res.writeHead(200, {"Content-Type":"text/html"});
		res.end(html);
	});
});

//insert data to database
routes.addRoute('/insert', function(req, res){
	if(req.method.toUpperCase() == "POST"){
		var dataPost = "";
		req.on('data', function(chuncks){
			dataPost += chuncks;
		});

		req.on('end', function(){
			dataPost = qs.parse(dataPost); //parse data dalam bentuk JSON
			connection.query("insert into mhs set ?", dataPost,
				function(err, field){
					if(err) throw err;

					res.writeHead(302, {"Location":"/"}); //redirect to /
					res.end();
				});
		});

	}else{
		var html = view.compileFile("./template/form_crud.html")();
		res.writeHead(200, {"Content-Type":"text/html"});
		res.end(html);
	}
});

//update data to database
routes.addRoute('/update/:id', function(req, res){
	connection.query("select * from mhs where ?",
		{ nim : this.params.id },
		function(err, rows, field){
			if(rows.length){
				var mhs = rows[0]; //mengambil index nim pada JSON
				if(req.method.toUpperCase() == "POST"){
					var dataPost = "";
					req.on('data', function(chuncks){
						dataPost += chuncks;
					});

					req.on('end', function(){
						dataPost = qs.parse(dataPost);
						connection.query("update mhs set ? where ?", [ //array JSON
							dataPost, //data JSON nama + alamat
							{ nim : mhs.nim } //data nim
						],function(err, fields){
							if(err) throw err;

							res.writeHead(302, {"Location":"/"});
							res.end();
						});
					});
				}else{
					var html = view.compileFile("./template/update_crud.html")({
						data : mhs
					});
					res.writeHead(200, {"Content-Type":"text/html"});
					res.end(html);
				}
			}else{
				var html = view.compileFile("./template/404.html")();
				res.writeHead(404, {"Content-Type":"text/html"});
				res.end(html);
			}
		});
});

//delete data from database
routes.addRoute('/delete/:id', function(req, res){
	connection.query("delete from mhs where ?", {
		nim : this.params.id
	},function(err, fields){
		if(err) throw err;

		res.writeHead(302, {"Location":"/"});
		res.end();
	});
});

http.createServer(function(req, res){
	var pathName = url.parse(req.url).pathname;
	var match = routes.match(pathName);
	if(match){
		match.fn(req, res);
	}else{
		var html = view.compileFile("./template/404.html")();
		res.writeHead(404, {"Content-Type":"text/html"});
		res.end(html);
	}
}).listen(8888);

console.log("Server is running on PORT : 8888");