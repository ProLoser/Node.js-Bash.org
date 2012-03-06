var databaseUrl = "bash"; // "username:password@example.com/mydb"
var collections = ["quotes"]
var db = require("mongojs").connect(databaseUrl, collections);

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/bash');


/**
 * Schema definition
 */

// recursive embedded-document schema

var Quote = new Schema();

Quote.add({
    bash_id     : { type: Number, index: { unique: true } }
  , quote      : { type: String, required: true }
  , rank      : Number
});

/**
 * Define model.
 */

var quote = mongoose.model('Quote', Quote);

module.exports = {
	create: function(req, res, next) {
		console.log(req.body);
		new quote(req.body).save(function(){
			console.log('success');
			res.send(201);
		});
	},
	index: function(req, res, next) {
		quote.find(function(err, docs) {
			res.render(docs);
		});
	},
	read: function(req, res, next) {
		quote.find({ bash_id: req.params.id }, function(err, docs) {
			res.render(docs);
		});
	},
	update: function(req, res, next) {
		quote.update({ bash_id: req.body.bash_id }, req.body, function(err, docs){
			res.send(200);
		});
	},
	del: function(req, res, next) {
		quote.remove({ bash_id: req.body.bash_id }, function(err, docs){
			res.send(204);
			return next();
		});
	}
};