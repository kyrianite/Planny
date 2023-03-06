import e from "express"

const model = require('./model')

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
      .exec()
      .then((data) => {
        callback(null, data)
      })
      .catch((err) => {
        console.log(err)
        callback(err)
      })
  },
  addPlant: (body, callback) => {
    let plant = body.plant
    console.log(plant)
    model.Plant.findOne().sort({_id: -1})
    // model.Plant.countDocuments()
    .then((lastPlant) => {
      let count = 0;
      if (lastPlant === null) {
        count = 1;
      } else {
        count = lastPlant.plantId + 1
      }
      let plantCopy = JSON.parse(JSON.stringify(plant))
      plantCopy.plantId = count
      plantCopy.userId = body.userId
      model.Plant.create(plantCopy)
        .then((data) => {callback(null,data)})
        .catch((err) => {callback(err)})
    })
    .catch((err) =>{
      console.log('this is err', err)
    })
  },
  findPlant: (filter, callback) => {
    model.Plant.find(filter)
      .then((data) => {
        callback(null, data)
      })
      .catch((err) => {
        callback(err)
      })
  },
  postMessage: (body, callback) => {
    let message = {
      messageId:1,
      messages: [JSON.parse(JSON.stringify(body).slice())],
      to:null,
    }
    if (message.messages[0].to) {
      message.to = JSON.parse(JSON.stringify(message.messages[0].to).slice())
      delete message.messages[0].to
    }
    console.log('thisis message', message)
    model.Messages.findOne().sort({_id: -1})
      .then((lastMessage) => {
        if (lastMessage === null) {
          console.log(message)
          model.Messages.create(message)
            .then((data) => callback(null, data))
            .catch((err) => {console.log(err)})
        } else {
          message.messageId = lastMessage.messageId + 1
          model.Messages.create(message)
            .then((data) => callback(null, data))
            .catch((err) => callback(err))
        }
      })
  },
  updateMessage: (body, callback) => {
    model.Messages.find({messageId:body.messageId})
      .then((data) => {
        let length = data[0].messages.length;
        let arrMessage = data[0].messages.slice()
        let objUpdate = JSON.parse(JSON.stringify(body.message).slice())
        objUpdate.count = length + 1;
        arrMessage.push(objUpdate)
        console.log(arrMessage)
        model.Messages.updateOne({messageId:body.messageId}, {messages:arrMessage})
         .then((data) => callback(null, data))
         .catch((err) => callback(err))
      })
  },
  findMessage: (body, callback) => {
    model.Messages.find(body)
      .then((data) => {
        callback(null, data)
      })
      .catch((err) => {
        callback(err)
      })
  },
  postHousehold: (body, callback) => {
    model.Household.findOne().sort({_id: -1})
      .then((lastHousehold) => {
        let objHousehold = {
          householdName: body.household.householdName,
          members:[body.userId],
          householdId:1
        }
        if (lastHousehold !== null) {
          objHousehold.householdId = lastHousehold.householdId +1
        }
        model.Household.create(objHousehold)
          .then((data) => {
            callback(null, data)
          })
          .catch((err) => {
            callback(err)
          })
      })
  },
  findHousehold: (body, callback) => {
    model.Household.find(body)
      .then((data) => {callback(null,data)})
      .catch((err) => {callback(err)})
  },
  updateHousehold: (body, callback) => {
    if (body.update.messageId) {
      model.Household.updateOne({householdId:body.householdId}, body.update)
      .then((data) => {callback(null, data)})
      .catch((err) => {callback(err)})
    } else {
      model.Household.updateOne({householdId:body.householdId}, {$addToSet: body.update})
      .then((data) => {callback(null, data)})
      .catch((err) => {callback(err)})
    }
  },
  postCommunity: (body, callback) => {
    model.Community.findOne().sort({_id: -1})
    .then((lastCommunity) => {
      let objCommunity = JSON.parse(JSON.stringify(body).slice())
      objCommunity.communityId = 1;
      if (lastCommunity !== null) {
        objCommunity.communityId = lastCommunity.communityId +1
      }
      model.Community.create(objCommunity)
        .then((data) => {
          callback(null, data)
        })
        .catch((err) => {
          callback(err)
        })
    })
  },
  updateCommunity: (body, callback) => {
    if (body.update.messageId) {
      model.Community.updateOne({communityId:body.communityId}, body.update)
      .then((data) => {callback(null, data)})
      .catch((err) => {callback(err)})
    } else {
      model.Household.updateOne({householdId:body.householdId}, {$addToSet: body.update})
      .then((data) => {callback(null, data)})
      .catch((err) => {callback(err)})
    }
  },
  findCommunity: (callback) => {
    model.Community.find()
      .then((data) => {callback(null,data)})
      .catch((err) => {callback(null)})
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

// {
//   "messageId":1,
//   "message": {
//       "userId":"try1",
//       "time":"2023-03-04T23:43:12.539Z",
//       "message":"try this out"
//   }
// }

// {
//   "from": "try2",
//   "to": "try1",
//   "message": "gonnatry this",
//   "time":"2023-03-06T01:53:53.001Z"
//   }

