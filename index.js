"use strict";

const express = require('express');
const session = require('express-session');
const http = require('http');
const WebSocket = require('ws');
const start = require('./controllers/controller-start')
const game = require('./controllers/controller-game')
const login = require('./controllers/controller-login');
const register = require('./controllers/controller-register');
const app = express();
const server = http.createServer(app);

app.listen(8081, () => console.log("Listening on http port 8081"))
const websoc = new WebSocket.Server({
    "server":server
});

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
app.use('/start', isLoggedIn, start);
app.use('/game', isLoggedIn, game);
app.use('/register', register);

websoc.on("request", reuest => {
    const connection = http.request.accept(null, request.origin);
    connection.on("open", () => console.log("opened!"))
    connection.on("close", () => console.log("closed!"))
    connection.on("message", message => {
        const result = JSON.parse(message.utf8Data)
        console.log(result)
    })
    const clientId = guid();
    clients[clientId] = {
        "connection": connection
    }
    
    const payLoad = {
        "method": "connect",
        "clientID": clientId
    }
    connection.send(JSON.stringify(payLoad))
});

app.get('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/controllers/public/views/404.html');
});

app.listen(PORT, () => { 
    console.log(`Server has been started on port ${PORT}...`) 
})

