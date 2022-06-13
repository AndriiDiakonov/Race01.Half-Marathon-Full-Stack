"use strict";
const express = require('express');

const register = require('../models/register');

const router = express.Router();

router.use(express.static(__dirname + '/public/style'));
router.use(express.static(__dirname + '/public/scripts'));

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/views/register.html");
});

router.post("/", async (req, res) => {
    const userData = req.body;
    const result = await register(userData);

    res.json(result);
})

module.exports = router;

