const { getPostData, decode } = require('../../../utils');
const { isAuthorized } = require('../../../isAuthorized')
const { getAdvertisementQuery, getAdvertisementByIdQuery } = require('../basebase/advertisement.database')
const { addAdvertisementValidation } = require('../validation/advertisement.validation')
const db = require('../../../connection/connection')
const fs = require('fs');
const path = require('path');
const uploadFolder = path.join(__dirname, "../../../uploads/advertisement")

const addAdvertisement = async(req, res) => {
    try {
        const body = await getPostData(req)
        const { description, image } = JSON.parse(body);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const buffer = Buffer.from(image.data, "base64");
        fs.writeFileSync(path.join(uploadFolder, uniqueSuffix + '-' + image.name), buffer);
        const advertisement = {
            description,
            image: path.join('uploads/advertisement', uniqueSuffix + '-' + image.name),
        }

        addAdvertisementValidation(req, res, advertisement)

    } catch (error) {
        console.log(error)
            //res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}


const getAdvertisement = async(req, res) => {
    try {
        getAdvertisementQuery(req, res)
    } catch (error) {
        console.log(error)
            //res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}

const getAdvertisementById = async(req, res, id) => {
    try {
        getAdvertisementByIdQuery(req, res, id)

    } catch (error) {
        console.log(error)
            //res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 500, message: 'some thing wrong', error }))
    }
}

module.exports = {
    addAdvertisement,
    getAdvertisement,
    getAdvertisementById,
}