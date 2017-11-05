	var express = require('express');
	var bodyParser = require('body-parser');
	var path = require('path');
	var favicon = require('serve-favicon');
	var logger = require('morgan');
	var cookieParser = require('cookie-parser');
	var mongoose = require('mongoose');
	var expressValidator = require('express-validator');
	
	var index = require('./routes/index');
	var users = require('./routes/users');
	var principal = require('./routes/principal');

	var app = express();

		/*Conexão banco Mongoose*/
				var mongoDB = 'mongodb://teste:teste@ds111788.mlab.com:11788/controle_transporte';
				mongoose.connect(mongoDB, {
				  useMongoClient: true
				});
				var db = mongoose.connection;
				db.on('error', console.error.bind(console, 'MongoDB connection error:'));
				/*Conexão feita*/
	
	
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'pug');


	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(expressValidator());

	app.use('/', index);
	app.use('/users', users);
	app.use('/principal', principal);
	

	
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	
	app.use(function(err, req, res, next) {
	  
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};

	 
	  res.status(err.status || 500);
	  res.render('error');
	});

	module.exports = app;
