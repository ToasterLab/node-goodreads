const bookfinder = require('./bookfinder.js')
const fs = require('fs')
var key = "goodreads.key", secret = "goodreads.secret";

key = fs.readFileSync(key, "utf8")

secret = fs. readFileSync(secret, "utf8")

bookfinder.setup(key,secret);
bookfinder.findBook({bookTitle:"Ender's Game"}, function(err, data){
	console.log(data)
})