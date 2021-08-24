let fs = require("fs");
let rl = require("readline-sync");

let details = [];

let fname = rl.question("Enter the first name: ");
let lname = rl.question("Enter the last name: ");
let gendr = rl.question("Enter the gender: ");
let em = rl.questionEMail("Enter the email: ");
let date = new Date().toString();
debugger;
let obj = {firstname: fname, lastname: lname, gender: gendr, email: em, timestamp: date};

details = JSON.parse( fs.readFileSync("logrecords.json").toString() );
details.push(obj);
debugger;
fs.writeFileSync("logrecords.json", JSON.stringify(details));

