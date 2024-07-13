//const Swal = require("sweetalert2");
//import Swal from 'sweetalert2'

const socket = io();

let user;
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('messagesLogs');
let data;

socket.on('message', msg => {
    data = msg;
})

/*
socket.on("messaggeLogs", data => {
    let log = document.getElementById("messaggeLogs");
    let messagges ="";
    data.forEach(message => {
        messagges = messagges + `${message.user} dice: ${message.message}</br>`
    })
    log.innerHTML = messagges;
})
*/

socket.on('messagesLogs', msgs => {
    getData(msgs);
})

const getData = (msgs) => {
    let messages = '';
    msgs.forEach(message => {
        const isCurrentUser = message.user === user;
        const messageClass = isCurrentUser ? 'my-message' : 'other-message';
        messages = messages + `<div class="${messageClass}">${message.user}: ${message.message}</div>`;
    });
    log.innerHTML = messages;
    chatBox.scrollIntoView(false);
}

Swal.fire({
    title: "Identifiquese",
    input: "email",
    text: "Ingrese su correo electrónico para identificarse",
    inputValidator: (value) => {
        if (!value)
            return "Debe ingresar su correo electrónico"
        const eMailRex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!eMailRex.test(value))
            return "Debe ingresar un correo electrónico válido";
        return null;
    },
    allowOutsideClick: false  
}).then(result => {
    if (result.isConfirmed) {
        user = result.value;
        getData(data);
    }
})

chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            const message = chatBox.value;
            //socket.emit("messagge", {user:user, messagge:chatBox.value})
            socket.emit('message', {user, message});
            chatBox.value = "";
        }
    }
})

socket.on('new_user', () => {
    Swal.fire({
        text: "Nuevo usuario conectado",
        toast: true,
        position: "top-right"
    })
})