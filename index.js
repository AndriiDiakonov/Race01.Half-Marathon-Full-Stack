"use strict";
const express = require('express');
const session = require('express-session');

const login = require('./controllers/controller-login');
const profile = require('./controllers/controller-profile');
const register = require('./controllers/controller-register');

const app = express();
const PORT = process.env.PORT ?? 8080

app.set("trust proxy", 1); 
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
}));

app.use(express.static(__dirname + '/controllers/public'));
app.use(express.json());

function isLoggedIn(req, res, next) {
    if(!req.session.user){
        res.redirect('/login');
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.use('/login', login);
app.use('/profile', isLoggedIn, profile);
app.use('/register', register);

app.get('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/controllers/public/views/404.html');
});

app.listen(PORT, () => { 
    console.log(`Server has been started on port ${PORT}...`) 
})
