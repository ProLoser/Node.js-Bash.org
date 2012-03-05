var restify = require('restify'),
	server = restify.createServer(),
	model = require('./model');

/**
 * Router
 */
// Docs/etc.

server.get('/', function(req, res, next) {
  response.send(302, null, {
    Location: config.siteName + '/public'
  });
  return next();
});

server.get('/public', function(req, res, next) {
  fs.readFile('./public/index.html', 'utf8', function(err, file) {
    if (err) {
      res.send(500);
      return next();
    }

    res.send({
      code: 200,
      noEnd: true
    });
    res.write(file);
    res.end();
    return next();
  });
});

server.get('/favicon.ico', function(req, res, next) {
  fs.readFile('./public/media/img/favicon.ico', function(err, file) {
    if (err) {
      res.send(500);
      return next();
    }

    res.send({
      code: 200,
      noEnd: true
    });
    res.write(file);
    res.end();
    return next();
  });
});

server.get(/^\/media\/css\/*/, function(req, res, next) {
  fs.readFile('./public' + req.url, 'utf8', function(err, file) {
    if (err) {
      res.send(500);
      return next();
    }

    res.send({
      code: 200,
      noEnd: true
    });
    res.write(file);
    res.end();
    return next();
  });
});

server.get(/^\/media\/img\/*/, function(req, res, next) {
  fs.readFile('./public' + req.url, function(err, file) {
    if (err) {
      res.send(500);
      return next();
    }

    res.send({
      code: 200,
      noEnd: true
    });
    res.write(file);
    res.end();
    return next();
  });
});

server.get('/test', function(req, res, next) {
	res.send('Working');
	next();
});
server.get('/quotes', model.list);
server.post('/quotes', model.create);
server.put('/quotes', model.update);
server.get('/quotes/:id', model.read);
server.head('/quotes/:id', model.read);
server.del('/quotes/:id', model.del);

server.listen(15166, function() {
  console.log('%s listening at %s', server.name, server.url);
});