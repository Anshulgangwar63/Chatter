var socket = io.connect('http://localhost:4000');

const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      type = document.getElementById('typing');


btn.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value);
})

socket.on('chat',function(data){
    type.innerHTML = "";
    output.innerHTML += `<p><strong>${data.handle}</strong><br>${data.message}</p>`
});

socket.on('typing',function(data){
    type.innerHTML = `<p><em> ${data} is typing </em></p>`
});