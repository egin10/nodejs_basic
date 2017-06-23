// contoh asyncronous dari nodejs
// pengerjaan sintaks tidak menunggu sintaks lain selesai di kerjakan


function Order(idOrder, timeOut){
	console.log("ID Order " + idOrder);
	//proses order
	prosesOrder(idOrder, timeOut);
}

function prosesOrder(idOrder, timeOut){
	//method setTimeout oleh javascript untuk setting delay waktu yang diinginkan sebuah sintaks dikerjakan
	setTimeout(function(){
		console.log("ID Order " + idOrder + " telah diproses");
	}, timeOut); //delay fungsi selama 1 detik;
}

Order(101, 2000); // parameter yang dikirim adalah idOrder dan timeOut
Order(102, 4000);
Order(103, 6000);