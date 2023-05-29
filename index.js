require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const nocache = require("nocache");


if (process.env.STATUS === 'development') {
    var session = require('express-session');

}
else {
    var session = require('cookie-session');
}

const MongoStore = require('connect-mongo');

const routes = require('./routes/route.js')

process.env.STATUS === 'development'
    ? (db_port = process.env.dev_DB)
    : (db_port = process.env.prod_DB)

mongoose.connect(db_port, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!')
    })
    .catch(err => {
        console.log('OH NO MONGO CONNECTION ERROR!!!!')
        console.log(err)
    })


app.use(session({
    store: MongoStore.create({ mongoUrl: db_port }),
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(function (req, res, next) {
    res.locals.loggedin = req.session.username;
    next();
});

app.use(function (req, res, next) {
    res.locals.username = req.session.username;
    next();
});

app.use(nocache())


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));


app.listen(3000, () => {
    console.log('I AM ON PORT 3000');
})

app.use('/', routes);