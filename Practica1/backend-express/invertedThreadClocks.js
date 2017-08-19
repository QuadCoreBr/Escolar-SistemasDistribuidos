const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const moment = require('moment');

// reloj
// {
//     id: int,
//     socketID: string,
//     time: moment
// }
var relojes = new Array;

io.sockets.on('connect', function (socket) {
    console.log("Un reloj se ha conectado con el socket id: " + socket.id);
    socket.on('join', function (reloj) {
        console.log("el socket id: "+socket.id + "corresponde al reloj" + reloj.id);
        relojes.push(reloj);
        socket.emit('join',reloj);
        setInterval(function(){
            reloj.time =  moment(reloj.time).subtract(1, 'seconds');
            socket.emit('upgradeTime',reloj);
        }, 1000);
    });
    socket.on('newTime', function (reloj) {
        console.log("El reloj " + reloj.id + "pide un cambio a " + reloj.time);
        var r = findRelojByID(reloj.id);
        r.time=reloj.time;
    });
});
function findRelojByID(id) {
    var reloj;
    relojes.forEach(function(r) {
        if (id === r.id) {
            reloj = r;
        }
    });
    return r;
}
server.listen(3000);