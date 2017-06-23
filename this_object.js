var myObj = {
	name : "Egin",
	age  : 20,
	print : function() {
		console.log(this.name + " is " + this.age + " years old.");
		console.log(myObj.name + " is " + myObj.age + " years old."); //sama dengan menggunakan this
		//this === myObj
		console.log(this === myObj);
	},
};

myObj.print(); //karena print adalah sebuah fungsi