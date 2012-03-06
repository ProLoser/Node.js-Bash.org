
/**
 * Module dependencies.
 */

var express = require('express');

var app = express.createServer();

require('./mvc').boot(app);

app.listen(15166);
console.log('Express app started on port %s', app.address().port);