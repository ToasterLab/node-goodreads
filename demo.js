const bookfinder = require('./bookfinder.js')
const fs = require('fs')
var key = "goodreads.key", secret = "goodreads.secret";

key = fs.readFileSync(key, "utf8")

secret = fs. readFileSync(secret, "utf8")

bookfinder.findBook({key, bookTitle:"Ender's Game"}, function(err, data){
	console.log(data)
})