const { addPost, getAllPost, getPostById, updatePost, deletePost } = require('../controller/post');
const { isAuthorized } = require('../../../isAuthorized');
const postRoutes = (req, res) => {
    if (req.url === '/addPost' && req.method === 'POST') {
        isAuthorized(req, res, addPost)

    } else if (req.url === '/getAllPost' && req.method === 'GET') {
        isAuthorized(req, res, getAllPost)

    } else if (req.url.match(/\/getPostById\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, getPostById, id)

    } else if (req.url.match(/\/updatePost\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, updatePost, id)

    } else if (req.url.match(/\/deletePost\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, deletePost, id)
    }
}

module.exports = {
    postRoutes,
}