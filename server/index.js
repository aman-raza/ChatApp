const express = require('express');
const socket = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket) => {
    console.log('We have a new user connection!!!');

    socket.on('join',({ name, room }, callback) => {
        console.log(name, room);

        const error = true;

        if(error) {
            return callback({error: 'error'});
        }

        callback();
    });

    socket.on('disconnect', () => {
        console.log('User disconnected!!!');
    });
});

app.use(router);

server.listen(PORT, () =>  
    console.log(`Server running on port ${PORT}`)
);