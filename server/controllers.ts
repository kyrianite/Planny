import { useCallback } from 'react';

const db = require('./db');

module.exports = {
  createUser: (req, res) => {
    console.log(req.body);
    db.createUser(req.body, (err, data) => {
      if (err) {
        console.log('createUser', err);
        res.status(500);
        res.end(err);
      } else {
        res.status(201);
        res.json(data);
        res.end();
      }
    });
  },
  findUser: (req, res) => {
    db.findUser(req.query.userId, (err, data) => {
      if (err) {
        console.log('findUser', err);
        res.status(500);
        res.end(err);
      } else {
        res.status(200);
        res.json(data);
        res.end();
      }
    });
  },
  updateUser: (req, res) => {
    db.updateUser(req.body, (err, data) => {
      if (err) {
        res.status(500);
        res.end(err);
      } else {
        res.json(data);
        res.status(203);
        res.end();
      }
    });
  },
  addPlant: (req, res) => {
    db.addPlant(req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.end(err);
      } else {
        db.findUser(req.body.userId, (err, dataUser) => {
          if (err) {
            console.log(err);
          } else {
            let arrayPlants = dataUser[0].myPlants.slice();
            arrayPlants.push(data.plantId);
            let objUpdate = {
              userId: req.body.userId,
              update: { myPlants: arrayPlants },
            };
            db.updateUser(objUpdate, (err, dataUpdate) => {
              if (err) {
                console.log(err);
              } else {
                res.status(205);
                res.json(dataUpdate);
                res.end();
              }
            });
          }
        });
      }
    });
  },
  findPlant: (req, res) => {
    db.findPlant(req.query, (err, data) => {
      if (err) {
        res.status(500);
        res.end(err);
      } else {
        res.status(200);
        res.json(data);
        res.end();
      }
    });
  },
  postDm: (req, res) => {
    let postObj = {
      count: 1,
      userId: req.body.from,
      time: req.body.time,
      message: req.body.message,
      to: req.body.to,
    };
    db.postMessage(postObj, (err, data) => {
      let messageIdObtained = data.messageId;
      if (err) {
        console.log(err);
        res.status(500);
        res.json(err);
        res.end;
      } else {
        db.findUser(req.body.from, (err, dataUser) => {
          if (err) {
            console.log(err);
            res.status(500);
            res.json(err);
            res.end();
          } else {
            let messageArr = dataUser[0].messages.slice();
            messageArr.push(data.messageId);
            let objUpdate = {
              userId: req.body.from,
              update: { messages: messageArr },
            };
            db.updateUser(objUpdate, (err, dataUpdateUser) => {
              if (err) {
                console.log(err);
                res.status(500);
                res.json(err);
                res.end();
              } else {
                console.log('post dm done', { messageId: data.messageId });
                res.json({ messageId: data.messageId });
                res.status(205);
                res.end();
              }
            });
          }
        });
      }
    });
  },
  updateMessage: (req, res) => {
    db.updateMessage(req.body, (err, data) => {
      if (err) {
        res.status(500);
        res.end(err);
      } else {
        res.json(data);
        res.status(203);
        res.end();
      }
    });
  },
  findMessage: (req, res) => {
    db.findMessage(req.query, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.end(err);
      } else {
        res.json(data);
        res.status(200);
        res.end();
      }
    });
  },
  makeHousehold: (req, res) => {
    db.postMessage(null, (err, dataMessage) => {
      if (err) {
        console.log('make Household err', err);
        res.status(500);
        res.end(err);
      } else {
        let bodyHousehold = JSON.parse(JSON.stringify(req.body).slice());
        bodyHousehold.messageId = dataMessage.messageId;
        db.postHousehold(bodyHousehold, (err, dataHousehold) => {
          if (err) {
            console.log('this err in postHousehold', err);
            res.status(500);
            res.end(err);
          } else {
            db.findUser(req.body.userId, (err, dataUser) => {
              if (err) {
                console.log('this err in findUser');
                res.status(500);
                res.end(err);
              } else {
                let arrHousehold = dataUser[0].household.slice();
                arrHousehold.push(dataHousehold.householdId);
                let objUserUpdate = {
                  userId: req.body.userId,
                  update: {
                    household: arrHousehold,
                  },
                };
                db.updateUser(objUserUpdate, (err, dataUpdate) => {
                  if (err) {
                    console.log('err in updateUser', err);
                    res.status(500);
                    res.end(err);
                  } else {
                    res.json({
                      householdId: dataHousehold.householdId,
                      messageId: dataMessage.messageId,
                    });
                    res.status(205);
                    res.end();
                  }
                });
              }
            });
          }
        });
      }
    });
  },
  findHousehold: (req, res) => {
    req.query.householdId = Number(req.query.householdId);
    console.log(req.query.householdId);
    db.findHousehold({ householdId: req.query.householdId }, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.end(err);
      } else {
        res.json(data);
        res.status(200);
        res.end();
      }
    });
  },
  updateHousehold: (req, res) => {
    req.body.householdId = Number(req.body.householdId)
    console.log(typeof req.body.householdId)
    db.findUser(req.body.userId, (err, dataUser) => {
      if (err) {
        console.log('this err in findUser');
        res.status(500);
        res.end(err);
      } else {
        console.log(dataUser)
        let arrHousehold = dataUser[0].household.slice()
        arrHousehold.push(req.body.householdId)
        let objUserUpdate = {
          userId:req.body.userId,

          update: {
            household: arrHousehold,
          },
        };
        db.updateUser(objUserUpdate, (err, dataUpdate) => {
          if (err) {
            console.log('err in updateUser', err);
            res.status(500);
            res.end(err);
          } else {
            let objBody = {
              householdId: req.body.householdId,
              update: { members: req.body.userId },
            };

            db.updateHousehold(objBody, (err, dataUpdate) => {
              if (err) {
                console.log(err);
                res.status(500);
                res.end(err);
              } else {
                res.json(dataUpdate);
                res.status(205);
                res.end();
              }
            });
          }
        });
      }
    });
  },
  postHouseholdMessage: (req, res) => {
    let postObj = {
      count: 1,
      userId: req.body.userId,
      time: req.body.time,
      message: req.body.message,
    };
    db.postMessage(postObj, (err, data) => {
      if (err) {
        console.log('postMessage err', err);
        res.status(500);
        res.end(err);
      } else {
        let bodyUpdate = {
          householdId: req.body.householdId,
          update: { messageId: data.messageId },
        };
        db.updateHousehold(bodyUpdate, (err, dataUpdate) => {
          if (err) {
            console.log('updateHousehold', err);
            res.status(500);
            res.end(err);
          } else {
            res.json({ messageId: data.messageId });
            res.status(205);
            res.end();
          }
        });
      }
    });
  },
  postCommunity: (req, res) => {
    db.postMessage(null, (err, dataMessage) => {
      if (err) {
        console.log('make Household err', err);
        res.status(500);
        res.end(err);
      } else {
        let objRes = JSON.parse(JSON.stringify(req.body).slice());
        objRes.messageId = dataMessage.messageId;
        db.postCommunity(objRes, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500);
            res.end(err);
          } else {
            res.json(data);
            res.status(205);
            res.end();
          }
        });
      }
    });
  },
  postCommunityMessage: (req, res) => {
    let postObj = {
      count: 1,
      userId: req.body.userId,
      time: req.body.time,
      message: req.body.message,
    };
    db.postMessage(postObj, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.end();
      } else {
        let bodyUpdate = {
          communityId: req.body.communityId,
          update: { messageId: data.messageId },
        };
        db.updateCommunity(bodyUpdate, (err, dataUpdate) => {
          if (err) {
            console.log(err);
            res.status(500);
            res.end(err);
          } else {
            res.json({ messageId: data.messageId });
            res.status(203);
            res.end();
          }
        });
      }
    });
  },
  findCommunity: (req, res) => {
    db.findCommunity((err, data) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.end(err);
      } else {
        res.json(data);
        res.status(200);
        res.end();
      }
    });
  },
  updateCommunityLikes: (req, res) => {
    db.updateCommunityLikes({communityId: req.body.communityId}, (err, data) => {
      if (err) {
        console.log(err)
        res.status(500)
        res.end(err)
      } else {
        res.json(data)
        res.status(203)
        res.end()
      }
    }
    );
  },
};
