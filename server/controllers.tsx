
const db = require('./db.tsx')

module.exports= {
  createUser: (req, res) => {
    console.log(req.body)
    db.createUser(req.body, (err, data) => {
      if (err) {
        console.log('createUser', err)
        res.status(500)
        res.end(err)
      } else {
        res.status(201)
        res.json(data)
        res.end()
      }
    })
  },
  findUser: (req, res) => {
    db.findUser(req.query.userId, (err, data) => {
      if (err) {
        console.log('findUser', err)
        res.status(500)
        res.end(err)
      } else {
        res.status(200)
        res.json(data)
        res.end()
      }
    })
  },
  addPlant: (req, res) => {
    console.log('here')
    db.addPlant(req.body.plant, (err, data) => {
      if (err) {
        console.log(err)
        res.status(500)
        res.end(err)
      } else {
        db.findUser(req.body.userId, (err, dataUser) => {
          if (err) {
            console.log(err)
          } else {
            let arrayPlants = dataUser[0].myPlants.slice()
            arrayPlants.push(data.plantId)
            let objUpdate = {}
            objUpdate.userId = req.body.userId
            objUpdate.update = {myPlants: arrayPlants}
            db.updateUser(objUpdate, (err, dataUpdate) => {
              if (err) {
                console.log(err)
              } else {
                res.status(205)
                res.json(dataUpdate)
                res.end()
              }
            })
          }
        })
      }
    })
  }
}