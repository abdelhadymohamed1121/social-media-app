const db = require('./connection/connection')
const createUserTable = () => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, userName VARCHAR(255), email VARCHAR(255),password VARCHAR(255),image BLOB, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
}

const createPostTable = () => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, description VARCHAR(255),image  VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
}

const createAdvertisementTable = () => {
    let sql = 'CREATE TABLE advertisement(id int AUTO_INCREMENT, description VARCHAR(255),image  VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
}


const createCommentsTable = () => {
    let sql = 'CREATE TABLE comments(id int AUTO_INCREMENT, description VARCHAR(255), user_id int, post_id int, PRIMARY KEY(id), FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (post_id) REFERENCES posts(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
}


const createStoryTable = () => {
    let sql = 'CREATE TABLE story(id int AUTO_INCREMENT, description VARCHAR(255),image  VARCHAR(255), user_id int, PRIMARY KEY(id), FOREIGN KEY (user_id) REFERENCES users(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
}


const createLikesTable = () => {
    let sql = 'CREATE TABLE likes(id int AUTO_INCREMENT, user_id int, post_id int, PRIMARY KEY(id), FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (post_id) REFERENCES posts(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
}


module.exports = {
    createUserTable,
    createPostTable,
    createAdvertisementTable,
    createCommentsTable,
    createStoryTable,
    createLikesTable,
}