const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/planny';
mongoose.connect(uri);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('database connected')
})



let userSchema = mongoose.Schema({
  userId: {
    type:String,
    required:true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  household:[{type:Number}], //array of houseHold's id
  myPlants:[{type:Number}], //array of plant's id
  assignedPlants:[{type:Number}], //array of plant's id
  messages:[{type:Number}] //array of message's id
});

let householdSchema = mongoose.Schema({
  houseHoldId:{type:Number},
  members:[{type:String}], //array of member's id
  plants:[{type:Number}], // array of plant's id
  messageId:{type:Number}
})

let messagesSchema = mongoose.Schema({
  messageId: {type:Number},
  messages:[{
    count:{
      type:Number,
      required: true
    },
    user:{
      type:String,
      required:true
    },
    time:{
      type: Date,
      required: true
    }}],
    message: {
      type: String
    }
})

let plantSchema = mongoose.Schema({
  plantId:{
    type:Number,
    required:true
  },
  plantName:{
    type:String,
    required:true
  },
  plantType: {
    type:String,
    required:true
  },
  location: {
    type:String,
    required:true
  },
  careInstructions: {
    type:String
  },
  wateringSchedule: {
    type:Number,
    required:true
  },
  lastWater: {
    type:Date
  },
  careHistory:[],
  careTakers:[{type:String}],
  photo:{type:String}
})






let User = mongoose.model('User', userSchema);
let Household = mongoose.model('Household', householdSchema)
let Messages = mongoose.model('Messages', messagesSchema)
let Plant = mongoose.model('Plants', plantSchema)



module.exports = {
  User: User,
  Household: Household,
  Messages: Messages,
  Plant: Plant
}