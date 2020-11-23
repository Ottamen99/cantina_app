var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index/renderPage');
var apiRouter = require('./routes/other/api');
var indexFunctions = require('./routes/index/functions');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexRouter);
app.use('/users', usersRouter);
app.post('/drinkWine', indexFunctions.drinkWine);
app.post('/insertWine', indexFunctions.inserNewWine);
app.post('/insertProducer', indexFunctions.insertProducer);
app.post('/insertGrape', indexFunctions.insertGrapes);
app.get('/getWines', apiRouter.getWines);
app.get('/getDrinkedWines', apiRouter.getDrinkedWines);
app.get('/getProducers', apiRouter.getProducers);
app.get('/getGrapes', apiRouter.getTipo);
app.get('/getSize', apiRouter.getSize);
app.get('/getCategory', apiRouter.getCategory);
app.get('/getPosition', apiRouter.getPosition);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
