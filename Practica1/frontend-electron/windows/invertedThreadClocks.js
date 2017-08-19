const io = require('socket.io-client');
const moment = require('moment');

$( document ).ready(function() {
    $('.clockpicker').clockpicker({
        autoclose: true,
        'default': 'now'
        ,donetext: 'Done'
    });
    var inputReloj1 =  $('#r1').clockpicker({
        afterDone: function() {
            console.log("hola" + io.sockets);
        }
    });
});

//Se tiene un array de n posibles relojes
// reloj
// {
//     id: int,
//     socketID: string,
//     time: moment
// }
let relojes = new Array;

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
        socket.on('join', function (r) {
            console.log("El reloj " + r.id + "esta conectado con el servidor");
            relojes.push(r);
            setTime(dataClock,socket);
        });
        socket.on('upgradeTime', function (reloj) {
            document.getElementById(reloj.id).value = moment(reloj.time).format("hh:mm:ss");
        });
    });
    
}

function setTime(dataClock,socket){
    var timeStr =  $("#"+dataClock.id).attr('value');
    var time = new moment(timeStr, 'HH:mm:ss');
    var reloj = findRelojByID(dataClock.id);
    reloj.time = time;
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