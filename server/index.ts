// import * as dotenv from 'dotenv';
// dotenv.config();
// import express, { Express, Request, Response } from 'express';
// import * as path from 'path';

// const app: Express = express();
// const port = process.env.PORT || 3000;

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running on ${port}`);
// });

require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');
const router = require('./router');

app.use(bodyParser());
app.use(express.json());
// app.use(express.static(path.join(`${__dirname}/../client/dist`)));

app.use('/db', router);
// app.get('/db', (req, res) => {res.end('this is')})


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/household', (req, res) => {
  console.log(req.body)
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);