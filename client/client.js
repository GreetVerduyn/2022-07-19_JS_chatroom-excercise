
let socket = io();

let textClient = document.getElementById('input');
let loggedInUsers = document.getElementById('allUsers');
let welcome = document.getElementById('welcome');
let target = document.getElementById('target');

// set userName
let userName = prompt("enter your name");

//pass username
socket.emit("login", userName);

// send message
const sendToAll = () => {
   const message = {
      name: userName,
      msg: textClient.value,
      to:''
   }
   socket.emit("sendToAll", message);
}

const sendToMe = () => {
   const message = {
      name: userName,
      msg: textClient.value,
      to:''
   }
   socket.emit("sendToMe", message);
}


const sendToOne = (id, name, msg) => {
   const messageToOne = {
      msg: msg,
      from: {
         name: userName,
         id: socket.id,
      },
      to: {
         name: name,
         id: id,
      }
   }
   socket.emit("sendToOne", messageToOne);
}

// show message
socket.on('displayMessage', (message) => {
   target.innerHTML += `<br> ${message.name} to ${message.to}: ${message.msg}`;
});

// show message from/to All
socket.on('displayMessageToAll', (message) => {
   target.innerHTML += `<br> ${message.name} to all: ${message.msg}`;
});

// show message from/to 1 person
socket.on('displayMessageToOne', (message) => {
   target.innerHTML += `<br> ${message.from.name} (prive): ${message.msg}`;
});

// show all users
socket.on('loggedInUsers', (users) => {
   welcome.innerHTML = `Welcome ${userName}`;
   loggedInUsers.innerHTML = `active in chatroom:`;
   for (let i=0; i<users.length; i++){
      loggedInUsers.innerHTML += `<div onclick="selectOne('${users[i].id}', '${users[i].name}')">${users[i].name}</div>`;
      //loggedInUsers.innerHTML += '<br><div onclick="selectOne('+users[i]+')" >' +users[i].name+ '</div>';

   }

});

// select user
let selectOne = (id, name) =>{
   const msg = prompt("Send message to: " + name);
  // console.log('test', msg, id, name);
   sendToOne(id, name, msg);
}










/*

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
    // ...
});*/
