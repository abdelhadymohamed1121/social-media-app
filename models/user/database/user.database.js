const db = require('../../../connection/connection')
const { encode } = require('../../../utils')
const fs = require('fs');
const path = require('path');
const uploadFolder = path.join(__dirname, "../../../uploads/user")
const singUpQuery = async(req, res, user) => {
    let sql2 = `SELECT * FROM users WHERE email = "${user.email}"`;
    db.query(sql2, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            // const buffer = Buffer.from(user.image.data, "base64");
            // fs.writeFileSync(path.join(uploadFolder, uniqueSuffix + '-' + user.image.name), buffer);
            const user2 = {
                userName: user.userName,
                email: user.email,
                password: user.password,
                image: null, //path.join('uploads/user', uniqueSuffix + '-' + user.image.name),
            }
            let sql = 'INSERT INTO users SET ?'
            db.query(sql, user2, (err, result) => {
                if (err) throw err;
                console.log(result);
            });
            //res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 201, message: 'success' }))
        } else {
            //res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'this email is taken' }))
        }
    });
}

const logInQuery = async(req, res, user) => {
    let sql = `SELECT * FROM users WHERE email = "${user.email}"`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length == 1) {
            if (result[0]['password'] === user.password) {
                let x = "secret key" + Math.random() + "/" + user.email + "/" + user.password + "/" + Math.random()
                let token = encode(x);
                //res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ status: 200, message: 'logIn success', token: token }))
            } else {
                //res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ status: 404, message: 'please enter correct password' }))
            }
        } else {
            //res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'please enter correct email' }))
        }
    });

}

const getProfileDataQuery = async(req, res, email) => {
    let sql = `SELECT * FROM users WHERE email = "${email}"`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length == 1) {
            console.log(result[0]);
            //res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 200, result: result[0] }))
        } else {
            //res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'please enter correct email' }))
        }
    });
}

const updateProfileDataQuery = async(req, res, id, email, user) => {
    let sql3 = `SELECT * FROM users WHERE email = "${email}"`;
    db.query(sql3, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            // const buffer = Buffer.from(user.image.data, "base64");
            // fs.writeFileSync(path.join(uploadFolder, uniqueSuffix + '-' + user.image.name), buffer);
            const user2 = {
                userName: user.userName,
                email: user.email,
                password: user.password,
                image: null, //path.join('uploads/user', uniqueSuffix + '-' + user.image.name),
            }
            let sql = `UPDATE users SET userName = "${user2.userName}",email = '${user2.email}',password = '${user2.password}',image = '${user2.image}' WHERE id = "${id}"`
            db.query(sql, user2, (err, result) => {
                if (err) throw err;
                console.log(result);
            });
            //res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 201, message: 'updated success' }))
        } else {
            //res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'this email is taken' }))
        }
    });
}

const updatePasswordQuery = async(req, res, id, newPassword) => {
    let sql = `UPDATE users SET password = '${newPassword}' WHERE id = "${id}"`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
    //res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 201, message: 'updated success' }))
}

module.exports = {
    singUpQuery,
    logInQuery,
    getProfileDataQuery,
    updateProfileDataQuery,
    updatePasswordQuery,
}