const http = require('http');
const db = require('./connection/connection');
const fs = require('fs');
const path = require("path");
const url = require("url");
const { getImage } = require('./utils')
const {
    createUserTable,
    createPostTable,
    createAdvertisementTable,
    createCommentsTable,
    createStoryTable,
    createLikesTable,
} = require('./database')

const { userRoutes } = require('./models/user/routes/user.route');
const { postRoutes } = require('./models/post/routes/post.route');
const { commentRoutes } = require('./models/comment/routes/comment.route');
const { advertisementRoutes } = require('./models/advertisement/routes/advertisement.route');
const { storyRoutes } = require('./models/story/routes/story.route');
const { likeRoutes } = require('./models/like/routes/like.route');
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log(" database connected...")
})


const server = http.createServer((req, res) => {
    // if (req.url === '/createUser' && req.method === 'GET') {
    //     createUserTable();
    //     res.end();
    // } else if (req.url === '/createPost' && req.method === 'GET') {
    //     createPostTable();
    //     res.end();
    // } else if (req.url === '/createAdvertisement' && req.method === 'GET') {
    //     createAdvertisementTable();
    //     res.end();
    // } else if (req.url === '/createComment' && req.method === 'GET') {
    //     createCommentsTable();
    //     res.end();
    // } else if (req.url === '/createStory' && req.method === 'GET') {
    //     createStoryTable();
    //     res.end();
    // } else if (req.url === '/createLike' && req.method === 'GET') {
    //     createLikesTable();
    //     res.end();
    // }
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE, PATCH",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json"
    };

    if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    if (["GET", "POST", "PUT", "DELETE"].indexOf(req.method) > -1) {
        res.writeHead(200, headers);
        var request = url.parse(req.url, true);
        let x = request.pathname.split('/')[1]
        userRoutes(req, res);
        postRoutes(req, res);
        commentRoutes(req, res);
        advertisementRoutes(req, res);
        storyRoutes(req, res);
        likeRoutes(req, res);
        if (x === "uploads") {
            getImage(req, res)
        }

        return;
    }
});




const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))