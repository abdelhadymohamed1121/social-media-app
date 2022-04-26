const { addStory, getAllStory, getStoryById, updateStory, deleteStory } = require('../controller/story.controller');
const { isAuthorized } = require('../../../isAuthorized');
const storyRoutes = (req, res) => {
    if (req.url === '/addStory' && req.method === 'POST') {
        isAuthorized(req, res, addStory)

    } else if (req.url.match(/\/getAllStory\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, getAllStory, id)

    } else if (req.url.match(/\/getStoryById\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, getStoryById, id)

    } else if (req.url.match(/\/updateStory\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, updateStory, id)

    } else if (req.url.match(/\/deleteStory\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, deleteStory, id)
    }
}

module.exports = {
    storyRoutes,
}