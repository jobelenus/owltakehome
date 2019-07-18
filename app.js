var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs  = require('express-handlebars');
 

var indexRouter = require('./routes/index');
var taxRouter = require('./routes/tax');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/', indexRouter);
app.use('/tax', taxRouter);

module.exports = app;
