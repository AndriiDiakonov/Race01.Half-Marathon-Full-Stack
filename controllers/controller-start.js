"use strict";

const express = require('express');

const router = express.Router();

router.use(express.static(__dirname + '/public/style'));
router.use(express.static(__dirname + '/public/scripts'));


router.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/views/start.html");
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.json({redirect: '/login'});
});


module.exports = router;
