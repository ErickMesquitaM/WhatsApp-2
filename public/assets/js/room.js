const authScroll = document.getElementById('messages');
authScroll.scrollTop = authScroll.scrollHeight;


function back(){
    window.location.pathname = "/rooms"
}
function configRoom(){
    window.location.pathname += "/config"
}

document.getElementById('txt').addEventListener('keypress', function(e) {
    if(e.key == 'Enter'){
        sendMsg();
    }
});

let cookie = {};
document.cookie.split(';').forEach( (e) => {

    let [key,value] = e.split('=');
    cookie[key.trim()] = value;
})


var idRoom = window.location.pathname.slice(7)
var idUser = cookie.id_user.slice(7, 31)
var nameUser = cookie.user.replace("%20", ' ')


var socket = io();

function sendMsg(){

    let msg = document.getElementById('txt').value;
    
    if (msg.length > 0){

        socket.emit( idRoom , {idUser, nameUser, msg });
        document.getElementById('txt').value = "";
    }
}
 

socket.on( idRoom , (msg) => {

    if(msg.idUser == idUser){
        createMsg("user", msg)
    } else {
        createMsg("other", msg)
    }

});

function createMsg(type, msg){
    
    let ul = document.getElementById("messages");

    let li = document.createElement('li');
    let div = document.createElement("div")

    let h5 = document.createElement("h5")
    let p = document.createElement("p")

    h5.innerText = msg.nameUser
    p.innerText = msg.msg

    div.appendChild(h5)
    div.appendChild(p)
 
    if(type == "user")
        li.classList.add("msgUser")
    
    li.appendChild(div);    
    ul.appendChild(li);

    authScroll.scrollTop = authScroll.scrollHeight;
}