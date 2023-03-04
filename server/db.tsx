
const model = require('./model.tsx')

module.exports={
  updateUser: (objUpdate, callback) => {
    model.User.updateOne({userId:objUpdate.userId}, objUpdate.update)
      .exec()
      .then((data) => callback(null, data))
      .catch((err) =>callback(err))
  },
  createUser: (user, callback) => {
    model.User.create(user)
      .then((data) => {
        callback(null, data)
      })
      .catch((err) => {
        callback(err)
      })
  },
  findUser: (userId, callback) => {
    model.User.find({userId:userId})
      .then((data) => {
        callback(null, data)
      })
      .catch((err) => {
        callback(err)
      })
  },
  addPlant: (plant, callback) => {
    model.Plant.findOne().sort({_id: -1})
    // model.Plant.countDocuments()
    .then((lastPlant) => {
      let count;
      if (lastPlant === null) {
        count = 1
      } else {
        count = lastPlant.plantId + 1
      }
      let plantCopy = JSON.parse(JSON.stringify(plant))
      plantCopy.plantId = count
      model.Plant.create(plantCopy)
        .then((data) => {callback(null,data)})
        .catch((err) => {callback(err)})
    })
    .catch((err) =>{
      console.log('this is err', err)
      // let plantCopy = JSON.parse(JSON.stringify(plant))
      // plantCopy.plantId = 0
      // model.Plant.create(plantCopy)
      //   .then((data) => {callback(null, data)})
      //   .catch((err) => {callback(err)})
    })
  }
}

// {
//   "userId": "try1",
//   "firstName": "tryFN",
//   "lastName":"tryLN",
//   "email":"nate@gmail.com"
// }
// {
//   "userId":"try1",
//   "plant": {
//       "plantName":"tryPlant",
//       "plantType":"tryPlant",
//       "location":"tryPlant",
//       "careInstructions":"tryPlant",
//       "wateringSchedule":5
//   }
// }