const { singUp, logIn, getProfileData, updateProfileData, updatePassword } = require('../controller/user');
const { isAuthorized } = require('../../../isAuthorized');
const userRoutes = (req, res) => {
    if (req.url === '/singUp' && req.method === 'POST') {
        singUp(req, res);
    } else if (req.url === '/logIn' && req.method === 'POST') {
        logIn(req, res);
    } else if (req.url === '/getProfileData' && req.method === 'GET') {
        isAuthorized(req, res, getProfileData)

    } else if (req.url.match(/\/updateProfileData\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, updateProfileData, id)

    } else if (req.url.match(/\/updatePassword\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, updatePassword, id)
    }
}

module.exports = {
    userRoutes,
}