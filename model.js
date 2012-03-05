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
		quote.save(req.params, function(){
		  res.send(201);
		  return next();
		});
	},
	list: function(req, res, next) {
		quote.find(function(err, docs) {
		  res.send(docs);
		  return next();
		});
	},
	read: function(req, res, next) {
	  quote.find({ bash_id: req.params.id }, function(err, docs) {
		  res.send(docs);
		  return next();
		});
	},
	update: function(req, res, next) {
		quote.update({ bash_id: req.params.id }, req.params, function(err, docs){
		  res.send(200);
		  return next();
		});
	},
	del: function(req, res, next) {
		quote.remove({ bash_id: req.params.id }, function(err, docs){
		  res.send(204);
		  return next();
		});
	}
};