const { addCommentQuery } = require('../database/comment.databse')

let addCommentValidation = async(req, res, comment) => {

    if (comment.description) {
        addCommentQuery(req, res, comment);
    } else {
        //res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 404, message: 'please enter your comment' }))
    }
}


module.exports = {
    addCommentValidation,
}