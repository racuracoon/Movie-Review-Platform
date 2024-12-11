var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require("express-session");

var userRouter = require('./routes/userRouter')
var movieRouter = require('./routes/movieRouter')
var reviewRouter = require('./routes/reivewRouter')
var likeRouter = require('./routes/likeRouter')

var app = express();

app.use(session({
  secret: 'yourSecretKey', // 세션 암호화에 사용할 키
  resave: false,            // 세션을 항상 저장할지 여부 (변경되지 않은 세션도 저장)
  saveUninitialized: false, // 초기화되지 않은 세션도 저장할지 여부
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 세션 유지 시간 (1일)
    httpOnly: true,              // 클라이언트에서 쿠키에 접근하지 못하게 함
  }
}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 만든 router 작성
 */
app.use('/user', userRouter);
app.use('/movie', movieRouter);
app.use('/review', reviewRouter);
app.use('/like', likeRouter);

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
