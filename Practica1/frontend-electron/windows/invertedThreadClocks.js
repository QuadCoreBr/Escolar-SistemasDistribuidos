var io = require('socket.io-client');

$(document).ready(function() {
    
});
//Se tiene un array de conexiones de los posibles relojes que se pueden crear
var sockets = new Array;

function conectarReloj(dataClock){
    // data {
    //     id:id
    // }
    //direccion del server
    var socket = io.connect('http://127.0.0.1:3000');
    socket.on('connect', function(data) {
        //obtenemos la hora inicial con la que viene el reloj
        var time =  $("#"+dataClock.id).attr('value');
        //inicializamos el reloj del lado del server con los datos del reloj
        socket.emit('join',{id:dataClock.id ,time:time});
        //cuando el server dispara el evento substract debemos actualizar el valor del reloj 
        socket.on('substract', function (data) {
            console.log("me han quitado un seg");
        });
    });
    //se agrega la nueva conexion al array de sockets
    sockets.push(socket);
}

function setTime(dataClock){
    var idReloj = dataClock.id;
    // se recopera el valor del value del reloj
    var time =  $("#"+idReloj).attr('value');
    // se le envia al server el nuevo valor de hora del reloj selecionado
    sockets[idReloj-1].emit('setTime',time);
}