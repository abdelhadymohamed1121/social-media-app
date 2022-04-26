const db = require('../../../connection/connection')

const addCommentQuery = async(req, res, comment) => {
    let sql = 'INSERT INTO comments SET ?'
    db.query(sql, comment, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
    //res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 201, message: 'success' }))
}

const getCommentsQuery = async(req, res, id) => {
    let sql = `SELECT * FROM comments WHERE post_id = "${id}"`;
    db.query(sql, (err, result) => {
        console.log(result)
        if (result.length === 0) {
            //res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'please enter correct id' }))
        } else {
            //res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 201, message: 'success' }))
        }
    });
}

const updateCommentQuery = async(req, res, id, comment) => {
    let sql2 = `UPDATE comments SET description = "${comment.description}",user_id = '${comment.user_id}',post_id = '${comment.post_id}' WHERE id = "${id}"`
    db.query(sql2, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
    //res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 200, message: 'updated success' }))
}

const deleteCommentQuery = async(req, res, id) => {
    let sql = `SELECT * FROM comments WHERE id = "${id}"`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length == 1) {
            let sql2 = `DELETE FROM comments WHERE id = ${id}`;
            db.query(sql2, (err, result) => {
                if (err) throw err;
                console.log(result);
            });
            //res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 200, message: 'deleted success' }))

        } else {
            //res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'please enter correct id' }))
        }
    });
}


module.exports = {
    addCommentQuery,
    getCommentsQuery,
    updateCommentQuery,
    deleteCommentQuery,
}