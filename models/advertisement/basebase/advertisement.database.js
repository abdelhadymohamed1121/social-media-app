const db = require('../../../connection/connection')


const addAdvertisementQuery = async(req, res, advertisement) => {
    let sql = 'INSERT INTO advertisement SET ?'
    db.query(sql, advertisement, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
    //res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 201, message: 'success' }))
}

const getAdvertisementQuery = async(req, res) => {
    let sql = `SELECT * FROM advertisement`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
            //res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 200, result: result }))
    });

}

const getAdvertisementByIdQuery = async(req, res, id) => {
    let sql = `SELECT * FROM advertisement WHERE id = "${id}"`;
    db.query(sql, (err, result) => {
        console.log(result)
        if (result.length === 0) {
            //res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 404, message: 'please enter correct id' }))
        } else {
            //res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 200, result: result }))
        }
    });
}

module.exports = {
    addAdvertisementQuery,
    getAdvertisementQuery,
    getAdvertisementByIdQuery,
}