const db = require('./connection/connection');
const fs = require('fs');
const path = require("path");
const url = require("url");

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(err)
        }
    })
}

function checkUser(email) {
    let x = false;
    try {
        let sql = `SELECT * FROM users WHERE email = "${email}"`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            //console.log(result);
            if (result.length == 0) {
                console.log("ali")
                x = true;

            } else {
                console.log("aldsdasi")
                return result;
            }
        });
    } catch (error) {
        console.log(error)
    }
}


let encode = (data) => {
    let buff = new Buffer.from(data);
    let base64data = buff.toString('base64');
    return base64data;
};

let decode = (encodedData) => {
    let buff = new Buffer.from(encodedData, 'base64');
    let data = buff.toString('ascii');
    return data;
};


const getImage = async(req, res) => {
    var request = url.parse(req.url, true);
    let x = request.pathname.split('/')[1]
    console.log(x)
    var action = request.pathname;
    var filePath = path.join(__dirname, action).split("%20").join(" ");
    fs.exists(filePath, function(exists) {

        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.end("404 Not Found");
            return;
        }
        var ext = path.extname(action);
        var contentType = "text/plain";
        if (ext === ".png") {
            contentType = "image/png";
        }
        res.writeHead(200, {
            "Content-Type": contentType
        });
        fs.readFile(filePath,
            function(err, content) {
                res.end(content);
            });
    });
}





module.exports = {
    getPostData,
    checkUser,
    encode,
    decode,
    getImage,
}