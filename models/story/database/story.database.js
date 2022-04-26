const db = require('../../../connection/connection')


const addStoryQuery = async(req, res, story) => {
    let sql = 'INSERT INTO story SET ?'
    db.query(sql, story, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'success' }))
}

const getAllStoryQuery = async(req, res, id) => {
    let sql = `SELECT * FROM story WHERE user_id != "${id}" `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
    });
}

const getStoryByIdQuery = async(req, res, id) => {
    let sql = `SELECT * FROM story WHERE user_id = "${id}"`;
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


const updateStoryQuery = async(req, res, id, story) => {
    let sql = `UPDATE story SET description = "${story.description}",image = '${story.image}',user_id = '${story.user_id}' WHERE id = "${id}"`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'updated success' }))
}

const deleteStoryQuery = async(req, res, id) => {
    try {
        let sql = `SELECT * FROM story WHERE id = "${id}"`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length == 1) {
                let sql2 = `DELETE FROM story WHERE id = ${id}`;
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
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    addStoryQuery,
    getAllStoryQuery,
    getStoryByIdQuery,
    updateStoryQuery,
    deleteStoryQuery,
}