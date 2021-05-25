var socket = io();
let message = document.getElementById('message');
let btn = document.getElementById('send');
let minombre = document.getElementById('minombre').value;
let sunombre = document.getElementById('sunombre').value;
let micorreo = document.getElementById('micorreo').value;
let sucorreo = document.getElementById('sucorreo').value;

socket.on('connect', function (data) {
  to = {
    micorreo
  }
    socket.emit('storeClientInfo', {to}); 
   });

btn.addEventListener('click', function () {
  chatbox.innerHTML += "<p><strong>"+minombre+"</strong>:"+message.value+"</p>";
socket.emit('chat:message', {
  message: message.value,
  sucorreo,
  minombre
})
});


socket.on('chat:message', function (data) {
chatbox.innerHTML += "<p style='text-align: right;'><strong>"+data.minombre+'</strong>:'+data.message+'</p>';
});


// Inicializamos socketIO en el cliente

/*
* Evento listener para el 'nuevo mensaje'
*   Se puede ver que es el mismo evento que se envia 
*   desde el servidor.
* Agregamos el mensaje ingresado por el usuario a la lista.
*/


/*
* Emitimos un evento de tipo 'nuevo mensaje' cada vez
* que se presiona el botón enviar y enviamos
* su contenido como mensaje.
*/
