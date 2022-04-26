const { getPostData, encode, decode } = require('../../../utils');
const { signUpValidation, logInValidation, getProfileDataValidation, updateProfileDataValidation, updatePasswordValidation } = require('../validation/validation')
const db = require('../../../connection/connection')
const fs = require('fs');
const path = require('path');
const uploadFolder = path.join(__dirname, "../../../uploads/user")
const singUp = async(req, res) => {
    try {

        const body = await getPostData(req)
        const { userName, email, password, image } = JSON.parse(body)
        if (!userName) {
            //res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'please enter your userName' }))
        } else if (!email) {
            //res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'please enter your email' }))
        } else if (!password) {
            //res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'please enter your password' }))
        } else if (!image) {
            // res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'please enter your image' }))
        } else {
            const user = {
                userName,
                email,
                password,
                image,
            }
            signUpValidation(req, res, user);
        }
    } catch (error) {
        console.log(error)
            //res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}

const logIn = async(req, res) => {
    try {

        const body = await getPostData(req)
        const { email, password } = JSON.parse(body)
        if (!email) {
            //res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'please enter your email' }))
        } else if (!password) {
            //res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'please enter your password' }))
        } else {
            const user = {
                email,
                password,
            }
            logInValidation(req, res, user)
        }
    } catch (error) {
        console.log(error)
            // res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}


const getProfileData = async(req, res) => {
    try {

        // const body = await getPostData(req)
        // const { email } = JSON.parse(body)
        let bareToken = req.headers.authorization;
        let token = bareToken.split(" ")[1];
        let email = decode(token).split("/")[1];
        if (!email) {
            // res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'please enter your email' }))
        } else {
            getProfileDataValidation(req, res, email)

        }
    } catch (error) {
        console.log(error)
            // res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}


const updateProfileData = async(req, res, id) => {
    try {

        const body = await getPostData(req)

        const { userName, email, password, image } = JSON.parse(body)
        let sql2 = `SELECT * FROM users WHERE id = "${id}"`;
        db.query(sql2, (err, result) => {
            if (err) throw err;
            const user = {
                userName: userName || result[0]['userName'],
                email: email || result[0]['email'],
                password: password || result[0]['password'],
                image: image || result[0]['image']
            }
            if (result.length == 1) {
                updateProfileDataValidation(req, res, id, email, user)
            } else {
                //res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ status: 404, message: 'please enter correct id' }))
            }
        });
    } catch (error) {
        console.log(error)
            //res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}


const updatePassword = async(req, res, id) => {
    try {
        const body = await getPostData(req)
        const { oldPassword, newPassword } = JSON.parse(body)
        let sql2 = `SELECT * FROM users WHERE id = "${id}"`;
        db.query(sql2, (err, result) => {
            if (err) throw err;
            if (result.length == 1) {
                if (result[0]['password'] === oldPassword) {
                    updatePasswordValidation(req, res, id, newPassword)
                } else {
                    //res.writeHead(404, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ status: 404, message: 'please enter correct password' }))
                }
            } else {
                // res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ status: 404, message: 'please enter correct id' }))
            }
        });
    } catch (error) {
        console.log(error)
            //res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}



module.exports = {
    singUp,
    logIn,
    getProfileData,
    updateProfileData,
    updatePassword,
}