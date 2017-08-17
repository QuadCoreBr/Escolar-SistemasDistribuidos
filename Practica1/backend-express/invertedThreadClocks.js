const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const moment = require('moment');

var socketsInfo = new Array;

io.sockets.on('connect', function (socket) {
    socket.on('join', function (data) {
        console.log("Un reloj se ha conectado con el socket ID: "+socket.id);
        var timeStr = data.time;
        var time = new moment(timeStr, 'HH:mm:ss');
        socketsInfo.push({
            socket:socket,
            moment: time
        });
        crearHilo(socket);
    });
    socket.on('setTime', function (data) {
        console.log("piden set time");
        moments[data.id]=data.moment;
    });
});
const spawn = require('threads').spawn;

function crearHilo(socket) {
    console.log("creando hilo para el socket :" + socket.id)
    var socketInfo = findSocketInfo(socket);
    const reloj = spawn(function(socket, done) {
        setInterval(function(){ 
            console.log("hilo 3 sec");
            // socket.emit('join',{id:dataClock.id ,time:time});
        }, 3000);
        done({ string : scoket.id, integer : parseInt(socket.id) });
    });
    reloj.send(socket);
}

function findSocketInfo(socket) {
    var socketInfo;
    socketsInfo.forEach(function(sInfo) {
        if (socket.id === sInfo.socket.id) {
            socketInfo = sInfo;
        }
    });
    return socketInfo;
}
server.listen(3000);