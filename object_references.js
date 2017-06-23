// parent object
var myObj = {
	name : "Egin",
	age  : 20,
};

//child object
// jika di child isi dari object berubah, maka akan mempengaruhi nilai dari parent object
var newObj = myObj;
newObj.name = "Setia";

console.log(myObj);