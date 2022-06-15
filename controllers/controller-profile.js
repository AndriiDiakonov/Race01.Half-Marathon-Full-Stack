"use strict";
const express = require('express');

const router = express.Router();

router.use(express.static(__dirname + '/public/style'));
router.use(express.static(__dirname + '/public/scripts'));


router.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/views/profile.html");
});

router.get('/getUserData', (req, res) => {
    let userData = {};
    userData.name = req.session.user.name;
    userData.permission = req.session.user.permission;
    userData.email = req.session.user.email;

    res.json(userData);
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.json({redirect: '/login'});
});

module.exports = router;

