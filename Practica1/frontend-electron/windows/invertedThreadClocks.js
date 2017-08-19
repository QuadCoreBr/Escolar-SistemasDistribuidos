const io = require('socket.io-client');
const moment = require('moment');


//Se tiene un array de n posibles relojes
// reloj
// {
//     id: int,
//     socketID: string,
//     time: moment
// }
let relojes = new Array;

let sockets = new Array;
// dataClock {
//     id: string,
//     time: string
// }
function conectarReloj(dataClock){

    //Conexión con el servidor
    var socket = io.connect('http://127.0.0.1:3000');
    // nos conectamos
    socket.on('connect', function(data) {
        console.log("El reloj " + dataClock.id + "se esta conectando a el servidor");
        //obtenemos la hora inicial con la que viene el reloj
        var timeStr =  $("#"+dataClock.id).attr('value');
        var time = new moment(timeStr, 'HH:mm:ss');
        var reloj = {
            id: dataClock.id,
            socketID: socket.id,
            time: time
        }
        // autenticamos el reloj con el servidor
        socket.emit('join',reloj);
        //el server nos confirma nuestra autenticacion
        socket.on('join', function (data) {
            console.log("El reloj " + data.id + "esta conectado con el servidor");
            relojes.push(data);
        });
        socket.on('upgradeTime', function (reloj) {
            document.getElementById(reloj.id).value = moment(reloj.time).format("hh:mm:ss");
        });
    });
    sockets.push(socket);
    setTime(dataClock);
}

function setTime(dataClock){
    var timeStr =  $("#"+dataClock.id).attr('value');
    var time = new moment(timeStr, 'HH:mm:ss');
    var reloj = findRelojByID(dataClock.id);
    reloj.time = time;
    var socket = getSocketByID(reloj.socket.id);
    socket.emit('newTime',reloj);
}


function findRelojByID(id) {
    var reloj;
    relojes.forEach(function(r) {
        if (id === r.id) {
            reloj = r;
        }
    });
    return reloj;
}
function getSocketByID(id){
    var socket;
    sockets.forEach(function(r) {
        if (id === r.id) {
            socket = r.socket;
        }
    });
}