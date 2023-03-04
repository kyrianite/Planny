const routers = require('express').Router();

const controllers = require('./controllers.tsx');

// router.get('/reviews/:product_id/:sort/:count/:page', controllers.reviews.getReviewById)
routers.post('/user', controllers.createUser)
routers.get('/user', controllers.findUser)
routers.post('/plant', controllers.addPlant)
// router.post('/user', (req, res) => {res.end('how')})

module.exports = routers;