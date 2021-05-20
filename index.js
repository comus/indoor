const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin.html', (req, res) => {
  res.sendFile(__dirname + '/admin.html');
});

let current = null
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    current = msg
    io.emit('chat message', msg);
  });

  socket.on('get current', (msg) => {
    io.emit('chat message', current);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});