const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');

app.use('/', indexRouter);
app.use('/users', usersRouter);




module.exports = app;
