"use strict";
const express = require('express');

const login = require('../models/login');

const router = express.Router();

router.use(express.static(__dirname + '/public/style'));
router.use(express.static(__dirname + '/public/scripts'));

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/views/login.html");
});

router.post("/", async (req, res) => {
    const userData = req.body;
    const result = await login(userData, req.session);

    res.json(result);
});

module.exports = router;
