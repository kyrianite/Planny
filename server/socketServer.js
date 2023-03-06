const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

const port = process.env.PORT || 3420;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
let currentRoom = ''
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Client joined room ${room}`);
    currentRoom = room
  });

  socket.on('message', (message) => {
    console.log(message)
    io.to(currentRoom).emit('message', message);
    console.log(`user "${message.name}" sent "${message.message}" to room "${currentRoom}"`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});