
let socket = io.connect();

let textClient = document.getElementById('input')


document.getElementById('sentToAll').onclick = function () {
   socket.emit("sendToAll", textClient.value);
}

document.getElementById('sent').onclick = function () {
   socket.emit("sndMsg", textClient.value);
}

socket.on('displayMessage', (message) => {
   target.innerHTML += '<br>'+message;
});















/*

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
    // ...
});*/
