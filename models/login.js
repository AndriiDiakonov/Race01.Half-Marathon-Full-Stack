"use strict";
const User = require('./user'); 
 
const TYPE_SUCCESS = require('./const').typeSuccess;
const TYPE_ERROR = require('./const').typeError;

function checkUser(data) {
    if (!data.length)
        return "There's no user by that login";

    return '';
}

function comparePasswords(password, hash) {
    let res = password === hash;

    if (!res)
        return 'Wrong password';

    return '';
}

function checkErrors(searchErrorMsg, passwordErrorMsg) {
    let res = {};

    if (searchErrorMsg || passwordErrorMsg) {
        res.type = TYPE_ERROR;
        res.text = searchErrorMsg ? searchErrorMsg : passwordErrorMsg;
        return res;
    }

    res.type = TYPE_SUCCESS;
    res.text = 'You are successfully logged!';


    return res;
}

async function login(userData, session) {
    const userModel = new User();
    let data = await userModel.find('login', userData.login);
    let res = {};

    let searchErrorMsg = checkUser(data);
    let passwordErrorMsg = '';

    if (!searchErrorMsg)
        passwordErrorMsg = comparePasswords(userData.password, userModel.password);

    res = checkErrors(searchErrorMsg, passwordErrorMsg);
    
    if (res.type === TYPE_SUCCESS) {
        let user = {};
        user.loggedIn = true;
        user.name = userModel.name;
        user.login = userModel.login;
        user.email = userModel.email;
        user.permission = userModel.permission;
        session.user = user;
        res.redirect = `/profile`;
    }

    return res;
}

module.exports = login;
