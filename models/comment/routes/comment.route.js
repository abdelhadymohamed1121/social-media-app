const { addComment, getComments, updateComment, deleteComment } = require('../controller/comment');
const { isAuthorized } = require('../../../isAuthorized');
const commentRoutes = (req, res) => {
    if (req.url === '/addComment' && req.method === 'POST') {
        isAuthorized(req, res, addComment)

    } else if (req.url.match(/\/getComments\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, getComments, id)

    } else if (req.url.match(/\/updateComment\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, updateComment, id)

    } else if (req.url.match(/\/deleteComment\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, deleteComment, id)
    }
}

module.exports = {
    commentRoutes,
}