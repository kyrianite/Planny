const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('joinRoom', (room) => {
    console.log(room)
    socket.join(room);
  });

  socket.on('message', (message) => {
    console.log('message: ' + message);
    socket.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


