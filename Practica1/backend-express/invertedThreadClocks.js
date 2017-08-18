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
    const thread = spawn(function(input, done) {
        // Everything we do here will be run in parallel in another execution context. 
        // Remember that this function will be executed in the thread's context, 
        // so you cannot reference any value of the surrounding code. 
        done({ input });
      });
    thread
    .send(socketInfo)
    // The handlers come here: (none of them is mandatory) 
    .on('message', function(response) {
      console.log(response);
      thread.kill();
    })
    .on('error', function(error) {
      console.error('Worker errored:', error);
    })
    .on('exit', function() {
      console.log('Worker has been terminated.');
    });
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