var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require ('dotenv');
const cors = require ('cors');


dotenv.config();

/**Declaracion de rutas */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authrouter = require ('./routes/auth');
const recoveryRouter =  require ('./routes/recovery');
const changedRouter =  require ('./routes/change');
var app = express();

//CORS POLICY
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/***uso de las rutas */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recovery',recoveryRouter);
app.use('/auth', authrouter);
app.use('/change', changedRouter);


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
console.log("Base de datos = " + process.env.DB_NAME);
module.exports = app;
