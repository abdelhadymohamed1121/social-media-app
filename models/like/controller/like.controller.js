const { getPostData } = require('../../../utils');
const { addLikeQuery, getLikeQuery, deleteLikeQuery } = require('../database/like.database')

const addLike = async(req, res) => {
    try {

        const body = await getPostData(req)
        const { user_id, post_id } = JSON.parse(body);
        const like = {
            user_id,
            post_id,
        }

        addLikeQuery(req, res, like)

    } catch (error) {
        console.log(error)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'some thing wrong', error }))
    }
}


const getLikes = async(req, res, id) => {
    try {
        getLikeQuery(req, res, id)
    } catch (error) {
        console.log(error)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'some thing wrong', error }))
    }
}



const deleteLike = async(req, res, id) => {
    try {
        deleteLikeQuery(req, res, id)
    } catch (error) {
        console.log(error)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'some thing wrong', error }))
    }
}

module.exports = {
    addLike,
    getLikes,
    deleteLike,
}