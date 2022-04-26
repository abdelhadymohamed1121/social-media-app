const db = require('../../../connection/connection')

const addLikeQuery = async(req, res, like) => {
    let sql = `SELECT * FROM likes WHERE post_id = "${like.post_id}" AND user_id = "${like.user_id}"`;
    db.query(sql, (err, result) => {
        console.log(result)
        if (result.length === 0) {
            let sql2 = 'INSERT INTO likes SET ?'
            db.query(sql2, like, (err, result) => {
                if (err) throw err;
                console.log(result);
            });
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'success' }))
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'user is aready like this post' }))
        }
    });

}

const getLikeQuery = async(req, res, id) => {
    let sql = `SELECT * FROM likes WHERE post_id = "${id}"`;
    db.query(sql, (err, result) => {
        console.log(result)
        if (result.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'please enter correct id' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(result))
        }
    });
}

const deleteLikeQuery = async(req, res, id) => {
    let sql = `SELECT * FROM likes WHERE id = "${id}"`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length == 1) {
            let sql2 = `DELETE FROM likes WHERE id = ${id}`;
            db.query(sql2, (err, result) => {
                if (err) throw err;
                console.log(result);
            });
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'deleted success' }))

        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'please enter correct id' }))
        }
    });
}


module.exports = {
    addLikeQuery,
    getLikeQuery,
    deleteLikeQuery,
}