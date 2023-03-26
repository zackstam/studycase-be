var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

const routerProduct = require('./routes/routeProduct')
const routerCategory = require('./routes/routeCategory')
const routerTag = require('./routes/routeTag')

var app = express();
const { NOT_FOUND_PATH } = require('./constant/errorCode');
const { NOT_FOUND, ERROR_SERVER } = require('./constant/errorHttp');
const { PATH_NOT_FOUND } = require('./constant/errorMessage');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routerProduct)
app.use(routerCategory)
app.use(routerTag)

//render home
app.use(function(req, res) {
  res.render('index', {
    title: 'Studycase API Service'
  })
})


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new HttpError(PATH_NOT_FOUND, NOT_FOUND, NOT_FOUND_PATH);
  throw error;
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
      return next(error);
  }
  res.status(error.status || ERROR_SERVER).json({ message : error.message, code: error.code });
})

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
