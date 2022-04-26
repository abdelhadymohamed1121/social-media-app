const { getPostData } = require('../../../utils');
const { addPostValidation } = require('../validation/post.validation')
const { getAllPostQuery, getPostByIdQuery, updatePostQuery, deletePostQuery } = require('../database/post.datbase')
const db = require('../../../connection/connection')
const fs = require('fs');
const path = require('path');
const uploadFolder = path.join(__dirname, "../../../uploads/post")

const addPost = async(req, res) => {
    try {

        const body = await getPostData(req)
        const { description, image, user_id } = JSON.parse(body);
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // const buffer = Buffer.from(image.data, "base64");
        // fs.writeFileSync(path.join(uploadFolder, uniqueSuffix + '-' + image.name), buffer);
        const post = {
            description,
            image: null, //path.join('uploads/post', uniqueSuffix + '-' + image.name),
            user_id,
        }
        addPostValidation(req, res, post)

    } catch (error) {
        console.log(error)
            //res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}

const getAllPost = async(req, res) => {
    try {
        getAllPostQuery(req, res)
    } catch (error) {
        console.log(error)
            //res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}


const getPostById = async(req, res, id) => {
    try {
        getPostByIdQuery(req, res, id)
    } catch (error) {
        console.log(error)
            //res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}


const updatePost = async(req, res, id) => {
    try {

        const body = await getPostData(req)
        const { description, image } = JSON.parse(body);
        let sql2 = `SELECT * FROM posts WHERE id = "${id}"`;
        db.query(sql2, (err, result) => {
            if (err) throw err;
            if (result.length == 1) {
                // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                // const buffer = Buffer.from(image.data, "base64");
                // fs.writeFileSync(path.join(uploadFolder, uniqueSuffix + '-' + image.name), buffer);
                //let y = "uploads/post/" + uniqueSuffix + "-" + image.name
                const post = {
                    description: description || result[0]['description'],
                    image: y || result[0]['image'],
                    user_id: result[0]['user_id'],
                }
                updatePostQuery(req, res, id, post)
            } else {
                //res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ status: 404, message: 'please enter correct id' }))
            }
        });
    } catch (error) {
        console.log(error)
            //res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}


const deletePost = async(req, res, id) => {
    try {
        deletePostQuery(req, res, id)
    } catch (error) {
        console.log(error)
            //res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}

module.exports = {
    addPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
}