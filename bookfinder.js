const fs = require("fs"), req = require("request");
const xml2js = require('xml2js');

var key = "goodreads.key" ,secret = "goodreads.secret";

const endpoints = {
	gbook: "https://www.goodreads.com/search.xml"
}

function bookfinder(){}

bookfinder.prototype.findBook = function(params, callback){
	req.get({
		url:endpoints.gbook,
		qs:{
			"key":params.key,
			"q":params.bookTitle,
			"search":"title"
		}
	}, function(err, res, body){
		if(err || res.statusCode !== 200) {callback("GoodReads API inaccessible")}
		let data = []
		let parser = new xml2js.Parser();
		parser.parseString(body, function (err, result) {
				let books = result.GoodreadsResponse.search[0].results[0].work;
				books.forEach(function(v,i){
					let book = {
						gid: v.best_book[0].id[0]._, //goodreads book id
						origPubYear: v.original_publication_year[0]._,
						avgRating: v.average_rating[0],
						title: v.best_book[0].title,
						author: {
							id: v.best_book[0].author[0].id[0]._,
							name: v.best_book[0].author[0].name[0]
						},
						image: v.best_book[0].image_url[0],
						sImage: v.best_book[0].small_image_url[0]
					}
					data.push(book)
				});
    });
		callback(null, data)
	})
}

module.exports = new bookfinder()