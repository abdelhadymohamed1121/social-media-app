const { addAdvertisementQuery } = require('../basebase/advertisement.database')


let addAdvertisementValidation = async(req, res, advertisement) => {

    if (advertisement.description || advertisement.image) {
        addAdvertisementQuery(req, res, advertisement);
    } else {
        // res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 404, message: 'please enter description or image' }))
    }
}

module.exports = {
    addAdvertisementValidation,
}