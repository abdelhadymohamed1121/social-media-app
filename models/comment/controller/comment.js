const { getPostData } = require('../../../utils');
const { addCommentValidation } = require('../validation/comment.validation')
const { getCommentsQuery, updateCommentQuery, deleteCommentQuery } = require('../database/comment.databse')
const db = require('../../../connection/connection')

const addComment = async(req, res) => {
    try {

        const body = await getPostData(req)
        const { description, user_id, post_id } = JSON.parse(body);
        const comment = {
            description,
            user_id,
            post_id,
        }

        addCommentValidation(req, res, comment)

    } catch (error) {
        console.log(error)
            //res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}


const getComments = async(req, res, id) => {
    try {
        getCommentsQuery(req, res, id)
    } catch (error) {
        console.log(error)
            // res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}


const updateComment = async(req, res, id) => {
    try {

        const body = await getPostData(req)
        const { description } = JSON.parse(body);
        let sql = `SELECT * FROM comments WHERE id = "${id}"`;
        db.query(sql, (err, result) => {
            if (err) throw err;

            if (result.length == 1) {
                const comment = {
                    description: description || result[0]['description'],
                    user_id: result[0]['user_id'],
                    post_id: result[0]['post_id'],
                }
                updateCommentQuery(req, res, id, comment)
            } else {
                // res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ status: 404, message: 'please enter correct id' }))
            }
        });
    } catch (error) {
        console.log(error)
            // res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}


const deleteComment = async(req, res, id) => {
    try {
        deleteCommentQuery(req, res, id)
    } catch (error) {
        console.log(error)
            //res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}

module.exports = {
    addComment,
    getComments,
    updateComment,
    deleteComment,
}