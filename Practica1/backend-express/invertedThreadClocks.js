const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.sockets.on('connection', function (socket) {
    setInterval(() => {
        socket.emit('substract', '-1s');
    },1000);
});

server.listen(3000);