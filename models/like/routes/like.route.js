const { addLike, getLikes, deleteLike } = require('../controller/like.controller');
const { isAuthorized } = require('../../../isAuthorized');
const likeRoutes = (req, res) => {
    if (req.url === '/addLike' && req.method === 'POST') {
        isAuthorized(req, res, addLike)

    } else if (req.url.match(/\/getLikes\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, getLikes, id)

    } else if (req.url.match(/\/deleteLike\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, deleteLike, id)
    }
}

module.exports = {
    likeRoutes,
}