const express = require('express');
const app = express();
const socket = require('socket.io');

const port = 4000;

var server = app.listen(port,function(){
    console.log(`chatter started at port ${port}`);
});

app.use(express.static('public'));


var io = socket(server);

io.on('connection',function(socket){
    console.log('connection established '+ socket.id);
    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    })
});