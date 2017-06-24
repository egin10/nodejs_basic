var http = require('http');
var url = require('url');
var routes = require('routes')();
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
		//untuk mengambil berdasarkan index saja
		rows.forEach(function(item){
			//foreach to item
			res.writeHead(200, {"Content-Type":"text/plain"});
			res.write(JSON.stringify(item.nama));
		});

		res.end("\n" + JSON.stringify(rows));
	});
});

//insert data to database
routes.addRoute('/insert', function(req, res){
	connection.query("insert into mhs set ?", { //JSON
		nim : "14615028",
		nama : "Ari Wahyu",
		alamat : "Samarinda"
	},function(err, field){
		if(err) throw err;

		res.writeHead(200, {"Content-Type":"text/plain"});
		res.end(field.affectedRows + " Affected Rows");
	});
});

//update data to database
routes.addRoute('/update', function(req, res){
	connection.query("update mhs set ? where ?", [ //Array JSON
	{ nama : "Ari Wahyu", alamat : "Bontang" },
	{ nim : "14615028" }
	],function(err, fields){
		if(err) throw err;

		res.writeHead(200, {"Content-Type":"text/plain"});
		res.end(fields.changedRows + " Rows Updated");
	});
});

//delete data from database
routes.addRoute('/delete', function(req, res){
	connection.query("delete from mhs where ?", {
		nim : "14615030"
	},function(err, fields){
		if(err) throw err;

		res.writeHead(200, {"Content-Type":"text/plain"});
		res.end(fields.affectedRows + " Rows Deleted");
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