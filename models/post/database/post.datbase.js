const db = require('../../../connection/connection')


const addPostQuery = async(req, res, post) => {
    let sql = 'INSERT INTO posts SET ?'
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
    //res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 201, message: 'success' }))
}

const getAllPostQuery = async(req, res) => {
    let sql = `SELECT * FROM posts`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
            //res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 200, message: 'success' }))
    });
}

const getPostByIdQuery = async(req, res, id) => {
    let sql = `SELECT * FROM posts WHERE user_id = "${id}"`;
    db.query(sql, (err, result) => {
        console.log(result)
        if (result.length === 0) {
            //res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'please enter correct id' }))
        } else {
            //res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 200, message: 'success' }))
        }
    });
}


const updatePostQuery = async(req, res, id, post) => {
    let sql = `UPDATE posts SET description = "${post.description}",image = '${post.image}',user_id = '${post.user_id}' WHERE id = "${id}"`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    //res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 200, message: 'updated success' }))
}

const deletePostQuery = async(req, res, id) => {
    try {
        let sql = `SELECT * FROM posts WHERE id = "${id}"`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length == 1) {
                let sql2 = `DELETE FROM posts WHERE id = ${id}`;
                db.query(sql2, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                });
                //res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ status: 200, message: 'deleted success' }))

            } else {
                // res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ status: 404, message: 'please enter correct id' }))
            }
        });
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    addPostQuery,
    getAllPostQuery,
    getPostByIdQuery,
    updatePostQuery,
    deletePostQuery,
}