require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const http = require('http').Server(app);
const PORT = 4000;

if (!process.env.CLIENT_URL ) {
    throw new Error('CLIENT_URL is not defined');
}

const socketIO = require('socket.io')(http, {
    cors: {
        origin: process.env.CLIENT_URL,
    }
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});


app.get("/api", (req, res) => {
    res.json({ message: "Hello" })
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
