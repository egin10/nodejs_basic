var http = require('http');
var url  = require('url'); //module for Query String
var fs   = require('fs'); //module file stream
var qs   = require('querystring'); //module querystring untuk parse query dari access.query

http.createServer(function(req, res){
	var access = url.parse(req.url); //parse req.url dengan module url nodejs
	var data = qs.parse(access.query); //melakukan parse untuk menyimpan data query
	// console.log(data); //data akan berupa JSON

	if(access.pathname == '/'){
		res.writeHeader(200, {"Content-Type":"text/plain"});
		res.end(JSON.stringify(data)); //JSON.stringify untuk mengubah data JSON ke bentuk string
	}else if(access.pathname == '/form'){ //handling POST
		if(req.method.toUpperCase() == 'POST'){
			var dataPost = ""; //mengambil data yang di POST

			req.on('data', function(chunck){
				dataPost += chunck
			});

			req.on('end', function(){
				dataPost = qs.parse(dataPost); //parse ke querystring agar datanya menjadi JSON
				res.writeHeader(200, {"Content-Type":"text/plain"});
				res.write(JSON.stringify(dataPost.nama) + "\n"); //menampilkan 1 data berdasarkan indexnya
				res.end(JSON.stringify(dataPost));
			});
		}else{ //GET
			res.writeHeader(200, {"Content-Type":"text/html"});
			fs.createReadStream("./template/form.html").pipe(res);
		}	
	}else{
		res.writeHeader(404, {"Content-Type":"text/plain"});
		res.end("Page Not Found!");
	}

	//routing dengan menggunakan pathname yang diperoleh dari module url
	// var file = "";
	// if(access.pathname == '/'){
	// 	file = "./template/index.html";
	// }else if(access.pathname == '/contact'){
	// 	file = "./template/contact.html";
	// }else{
	// 	file = "./template/404.html";
	// }

	// res.writeHeader(200, {"Content-Type":"text/html"});
	// fs.createReadStream(file).pipe(res);

}).listen(8888);

console.log("Server is running on PORT : 8888 ....")