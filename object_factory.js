var objFactory = require('./object_factory1.js');

var myObj = objFactory(); //karena module barupa sebuah fungsi, jadi seperti class
myObj.language = "PHP";
//sama seperti

var myObj1 = objFactory().language;
myObj1 = "JavaScript";

console.log(myObj.language);
console.log(myObj1);
myObj.print();