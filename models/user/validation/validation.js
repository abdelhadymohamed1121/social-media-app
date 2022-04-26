const { singUpQuery, logInQuery, getProfileDataQuery, updateProfileDataQuery, updatePasswordQuery } = require('../database/user.database')

let signUpValidation = async(req, res, user) => {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (user.email.match(emailRegex) && user.password.match(passwordRegex)) {
        singUpQuery(req, res, user);
    } else if (!user.email.match(emailRegex)) {
        // res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 404, message: 'this email is invaild' }))
    } else if (!user.password.match(passwordRegex)) {
        //res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 404, message: 'this password is invaild' }))
    }
}

let logInValidation = async(req, res, user) => {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (user.email.match(emailRegex) && user.password.match(passwordRegex)) {
        logInQuery(req, res, user);
    } else if (!user.email.match(emailRegex)) {
        //res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 404, message: 'this email is invaild' }))
    } else if (!user.password.match(passwordRegex)) {
        //res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 404, message: 'this password is invaild' }))
    }
}

let getProfileDataValidation = async(req, res, email) => {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(emailRegex)) {
        getProfileDataQuery(req, res, email);
    } else {
        //res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 404, message: 'this email is invaild' }))
    }
}

let updateProfileDataValidation = async(req, res, id, email, user) => {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (user.email.match(emailRegex) && user.password.match(passwordRegex)) {
        updateProfileDataQuery(req, res, id, email, user);
    } else if (!user.email.match(emailRegex)) {
        // res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 404, message: 'this email is invaild' }))
    } else if (!user.password.match(passwordRegex)) {
        //res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 404, message: 'this password is invaild' }))
    }
}

let updatePasswordValidation = async(req, res, id, newPassword) => {
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (newPassword.match(passwordRegex)) {
        updatePasswordQuery(req, res, id, newPassword);
    } else {
        //res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 404, message: 'this password is invaild' }))
    }
}

module.exports = {
    signUpValidation,
    logInValidation,
    getProfileDataValidation,
    updateProfileDataValidation,
    updatePasswordValidation,
}