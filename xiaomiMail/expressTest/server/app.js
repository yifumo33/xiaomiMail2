var createError = require('http-errors'); //依赖
var express = require('express'); 
var path = require('path'); //路径
var cookieParser = require('cookie-parser');//获取cookie信息
var logger = require('morgan');//日志输出

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods')

var app = express();
app.use("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));

var ejs = require('ejs')
app.set('view engine', 'html');
app.engine('.html',ejs.__express)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// app.use(function(req,res,next){
//   if(req.cookies.usersId){
//     console.log('老子有ID了')
//     next()
//   }else{
//     console.log("req.path:" + req.path)
//     if(req.path == '/users/login' || req.path == '/users/logout' || req.path == '/goods/list' ){
//       next()
//     }else{
//       res.json({
//         status:'10001',
//         msg:'当前未登陆',
//         result:''
//       })
//     }
//   }
// })



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods', goodsRouter);

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
