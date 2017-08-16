var io = require('socket.io-client');

$(document).ready(function() {
    
});

function setTime(nombreReloj){
    console.log(nombreReloj);
    var socket = io.connect('http://127.0.0.1:3000');
    socket.on('connect', function(data) {
        socket.on('substract', function(data) {
            console.log('me han quitado un segundo' + nombreReloj);
        });
    });
}