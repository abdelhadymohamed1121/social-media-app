const { getPostData } = require('../../../utils');
const { addStoryValidation } = require('../validation/story.validation')
const { getAllStoryQuery, getStoryByIdQuery, updateStoryQuery, deleteStoryQuery } = require('../database/story.database')
const db = require('../../../connection/connection')
const fs = require('fs');
const path = require('path');
const uploadFolder = path.join(__dirname, "../../../uploads/story")

const addStory = async(req, res) => {
    try {

        const body = await getPostData(req)
        const { description, image, user_id } = JSON.parse(body);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const buffer = Buffer.from(image.data, "base64");
        fs.writeFileSync(path.join(uploadFolder, uniqueSuffix + '-' + image.name), buffer);
        const story = {
            description,
            image: path.join('uploads/story', uniqueSuffix + '-' + image.name),
            user_id,
        }
        addStoryValidation(req, res, story)

    } catch (error) {
        console.log(error)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'some thing wrong', error }))
    }
}

const getAllStory = async(req, res, id) => {
    try {
        getAllStoryQuery(req, res, id)
    } catch (error) {
        console.log(error)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'some thing wrong', error }))
    }
}


const getStoryById = async(req, res, id) => {
    try {
        getStoryByIdQuery(req, res, id)
    } catch (error) {
        console.log(error)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'some thing wrong', error }))
    }
}


const updateStory = async(req, res, id) => {
    try {

        const body = await getPostData(req)
        const { description, image } = JSON.parse(body);
        let sql2 = `SELECT * FROM story WHERE id = "${id}"`;
        db.query(sql2, (err, result) => {
            if (err) throw err;
            if (result.length == 1) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const buffer = Buffer.from(image.data, "base64");
                fs.writeFileSync(path.join(uploadFolder, uniqueSuffix + '-' + image.name), buffer);
                let y = "uploads/story/" + uniqueSuffix + "-" + image.name
                const story = {
                    description: description || result[0]['description'],
                    image: y || result[0]['image'],
                    user_id: result[0]['user_id'],
                }
                updateStoryQuery(req, res, id, story)
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'please enter correct id' }))
            }
        });
    } catch (error) {
        console.log(error)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'some thing wrong', error }))
    }
}


const deleteStory = async(req, res, id) => {
    try {
        deleteStoryQuery(req, res, id)
    } catch (error) {
        console.log(error)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'some thing wrong', error }))
    }
}

module.exports = {
    addStory,
    getAllStory,
    getStoryById,
    updateStory,
    deleteStory,
}