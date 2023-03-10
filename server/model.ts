const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/planny';
mongoose.connect(uri);
const dbs = mongoose.connection;

dbs.on('error', console.error.bind(console, 'connection error:'));
dbs.once('open', function () {
  console.log('database connected');
});

let userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:
      'https://res.cloudinary.com/dsiywf70i/image/upload/v1678222821/download_uaih1t.jpg'
  },
  household: [
    {
      type: [Number],
      default: [],
    },
  ], //array of houseHold's id
  myPlants: [{ type: Number }], //array of plant's id
  assignedPlants: [{ type: Number }], //array of plant's id
  messages: [{ type: Number }], //array of message's id
});

let householdSchema = mongoose.Schema({
  householdId: { type: Number, required: true, index: true },
  householdName: { type: String, required: true },
  members: [{ type: String }], //array of member's id
  plants: [{ type: Number }], // array of plant's id
  messageId: { type: Number },
  photo: { type: String },
});

let messagesSchema = mongoose.Schema({
  messageId: { type: Number, required: true, index: true },
  to: { type: String },
  messages: [
    {
      count: {
        type: Number,
      },
      userId: {
        type: String,
      },
      firstName: { type: String },
      lastName: { type: String },
      time: {
        type: String,
      },
      message: {
        type: String,
      },
    },
  ],
});

let plantSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  plantId: {
    type: Number,
    required: true,
    index: true,
  },
  plantName: {
    type: String,
    required: true,
  },
  plantType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  careInstructions: {
    type: String,
  },
  wateringSchedule: {
    type: String,
    required: true,
  },
  waterCountDown: {
    type:Number,
  },
  lastWater: {
    type: Date,
  },
  careHistory: [],
  careTakers: [{ type: String }],
  photo: { type: String },
});

let communitySchema = mongoose.Schema({
  communityId: { type: Number, required: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  time: { type: Date, required: true },
  messageId: { type: Number },
  photos: [{ type: String }],
  userId: { type: String, required: true },
  topic: { type: String, required: true },
  plantName: { type: String },
  likes: { type: Number, default: 0 },
  plantType: { type: String },
});

let User = mongoose.model('User', userSchema);
let Household = mongoose.model('Household', householdSchema);
let Messages = mongoose.model('Messages', messagesSchema);
let Plant = mongoose.model('Plants', plantSchema);
let Community = mongoose.model('Community', communitySchema);

module.exports = {
  User: User,
  Household: Household,
  Messages: Messages,
  Plant: Plant,
  Community: Community,
};
