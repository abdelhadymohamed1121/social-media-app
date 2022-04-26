const { addAdvertisement, getAdvertisement, getAdvertisementById } = require('../controller/advertisement');
const { isAuthorized } = require('../../../isAuthorized')
const advertisementRoutes = (req, res) => {
    if (req.url === '/addAdvertisement' && req.method === 'POST') {
        isAuthorized(req, res, addAdvertisement)

    } else if (req.url === '/getAdvertisement' && req.method === 'GET') {
        isAuthorized(req, res, getAdvertisement)

    } else if (req.url.match(/\/getAdvertisementById\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        isAuthorized(req, res, getAdvertisementById, id)
    }
}

module.exports = {
    advertisementRoutes,
}