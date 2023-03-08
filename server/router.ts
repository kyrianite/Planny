import { removePushTokenSubscription } from "expo-notifications";

const routers = require('express').Router();

const controllers = require('./controllers');


routers.post('/user', controllers.createUser)
// {
//   "userId": "try1",
//   "firstName": "tryFN",
//   "lastName":"tryLN",
//   "email":"nate@gmail.com"
// }

routers.get('/user', controllers.findUser)
routers.put('/user', controllers.updateUser)
// {
//   "userId":'try1',
//   "update": {
//   "photos":
//   }
// }
routers.post('/plant', controllers.addPlant)
// {
//   "userId":"try1",
//   "plant": {
//       "plantName":"tryPlant",
//       "plantType":"tryPlant",
//       "location":"tryPlant",
//       "careInstructions":"tryPlant",
//       "wateringSchedule":5,
//       "waterCountDown": (Number)
//   }
// }

routers.get('/plant', controllers.findPlant)
// it can be userId:, or plantId:

routers.post('/dm', controllers.postDm)
// {
// "from": (userId),
// "to": (userId),
// "message":{ string}
// "time":{date}
// }

routers.put('/message', controllers.updateMessage)
// {
//   messageId:****,
//   message:{
//     userId: userId,
//     time: new Date (),
//     message:String
//   },
// }

routers.get('/message', controllers.findMessage)
// in params
// {
//   "messageId":1
// }
routers.get('/household', controllers.findHousehold)
// in params
// {
//   "householdId": 1
// }
routers.post('/household', controllers.makeHousehold)
// {
//   "userId":"try1",
//   "household": {
//     "householdName":"try1-house"
//     "photo":
//  }
// }

routers.put('/household', controllers.updateHousehold)
//in params
// {
//   "householdId": 1,
//   "userId": "try1"
// }
// {
//   "householdId": 1,
//   "plants": 1
// }

routers.post('/householdMessage', controllers.postHouseholdMessage)
// in body
// {
// "householdId": (householdId),
// "userId": (userId),
// "message":{ string}
// "time":{date}
// }

routers.post('/community', controllers.postCommunity)
// in body
// {
//   "time": "2023-03-06T01:53:53.001Z",
//   "photos":[],
//   "userId":"try1",
//   "topic":"topic1",
//   "plantName":"optional",
//   "plantType":"optional"
// }

routers.post('/communityMessage', controllers.postCommunityMessage)
// in body
// {
// "communityId": (communityId),
// "userId": (userId),
// "message":{ string}
// "time":{date}
// }

routers.get('/community', controllers.findCommunity)
// no need params

routers.put('/communityLikes', controllers.updateCommunityLikes)
// in params
// {
//   communityId:
// }


module.exports = routers;