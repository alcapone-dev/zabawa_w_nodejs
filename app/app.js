const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { sessionKeySecret } = require('./config');
const app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('views', path.join(__dirname + '/../views'));
app.set('layout', 'layouts/main');


// init db
require('./db/mongoose');


// sesja i cookies

app.use(session({
    secret: sessionKeySecret,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 }, // 2 dni
    resave: false
}));


// static files
app.use(express.static('public'));

//body parser //application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());

//middleware
app.use('/', require('./middleware/view-variables'));
app.use('/', require('./middleware/user-middleware'));
app.use('/admin/', require('./middleware/is-auth-middleware'));


// mount routes
app.use(require('./routes/web'));






module.exports = app;