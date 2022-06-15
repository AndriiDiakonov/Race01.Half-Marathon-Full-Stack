"use strict";
const express = require('express');

const router = express.Router();

router.use(express.static(`${process.cwd()}/game/style`));
router.use(express.static(`${process.cwd()}/game/assets`));

router.get('/', (req, res) => {
    res.sendFile(`${process.cwd()}/game/game.html`);
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.json({redirect: '/login'});
});

module.exports = router;
