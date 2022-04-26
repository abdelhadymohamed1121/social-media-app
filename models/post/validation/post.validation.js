const { addPostQuery } = require('../database/post.datbase')


let addPostValidation = async(req, res, post) => {

    if (post.description || post.image) {
        addPostQuery(req, res, post);
    } else {
        // res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 404, message: 'please enter description or image' }))
    }
}



module.exports = {
    addPostValidation,
}