const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const PORT = 4000;

const socketIO = require('socket.io')(http, {
    cors: {
        origin: process.env.CLIENT_URL,
    }
});

app.use(cors());

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});


app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
