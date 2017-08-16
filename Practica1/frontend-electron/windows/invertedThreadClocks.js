var io = require('socket.io-client');

$(document).ready(function() {
    
});

var sockets = new Array;

function conectarReloj(dataClock){
    console.log(dataClock.id);
    var socket = io.connect('http://127.0.0.1:3000');
    socket.on('connect', function(data) {
        var moment =  $("#"+dataClock.id).attr('value');
        socket.emit('join',{id:dataClock.id ,moment:moment});
        socket.on('substract', function (data) {
            console.log("me han quitado un seg");
        });
    });
    sockets.push(socket);
}

function setTime(data){
    var idReloj = data.id;
    // console.log(idReloj);
    var moment =  $("#"+idReloj).attr('value');
    // console.log(moment);
    sockets[idReloj-1].emit('setTime',moment);
}