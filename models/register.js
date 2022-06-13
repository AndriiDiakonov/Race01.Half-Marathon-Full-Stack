"use strict";
const User = require('./user');

const TYPE_SUCCESS = require('./const').typeSuccess;
const TYPE_ERROR = require('./const').typeError;

async function checkLogin(login) {
    
    const userModel = new User();
    let res = await userModel.find('login', login);

    if (res.length) {
        return 'The user with this login already exists';
    }

    return '';
}

async function checkEmail(email) {
    const userModel = new User();
    let res = await userModel.find('email', email);

    if (res.length) {
        return 'The user with this email already exists';
    }

    return '';
}

async function checkUnique(userData) {
    let loginErrorMsg = await checkLogin(userData.login);
    let emailErrorMsg = await checkEmail(userData.email);
    let res = {};

    if (loginErrorMsg || emailErrorMsg) {
        res.type = TYPE_ERROR;
        res.text = loginErrorMsg ? loginErrorMsg : emailErrorMsg;
        return res;
    }

    res.type = TYPE_SUCCESS;
    res.text = 'You are successfully registered!';
    return res;
}

async function register(userData) {
    let res = await checkUnique(userData);

    if (res.type === TYPE_SUCCESS) {
        const user = new User(0, userData.login, userData.password, userData.name, userData.email);
        user.save();
    }
    
    return res;
}

module.exports = register;
