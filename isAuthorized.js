const { decode } = require('./utils')
const db = require('./connection/connection')
const isAuthorized = async(req, res, query, id) => {
    try {
        if (req.headers.authorization) {
            let bareToken = req.headers.authorization;
            let token = bareToken.split(" ")[1];
            let x = decode(token).split("/")[1];
            let sql = `SELECT * FROM users WHERE email = "${x}"`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                if (result.length == 0) {
                    res.writeHead(400, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ message: 'unauthorized' }))
                } else {
                    query(req, res, id)
                }
            });
        } else if (!req.headers.authorization) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'unauthorized' }))
        }
    } catch (error) {
        console.log(error)
        if (error.message == "invalid signature") {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'unauthorized' }))
        } else {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Something went wrong', error }))
        }
    }
}


module.exports = {
    isAuthorized,
}