var express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var sequelize = require('./models');
var path = require('path');
var logger = require('morgan');

var viewRouter = require('./routes/view');
var apiRouter = require('./routes/api');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// sequelize(db) setting
sequelize.sequelize.sync();

// static file setting
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//view engine 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// router setting
app.use('/', viewRouter);
app.use('/api', apiRouter);

module.exports = app;