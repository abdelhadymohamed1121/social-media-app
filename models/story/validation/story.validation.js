const { addStoryQuery } = require('../database/story.database')


let addStoryValidation = async(req, res, story) => {

    if (story.description || story.image) {
        addStoryQuery(req, res, story);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'please enter description or image' }))
    }
}



module.exports = {
    addStoryValidation,
}