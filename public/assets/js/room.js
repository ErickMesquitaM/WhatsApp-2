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

var socket = io();

function sendMsg(){
    
    let msg = document.getElementById('txt').value;
    
    if (msg.length > 0){

        let user = "ulala"

        socket.emit('message', {user, msg });
        createMsg("user", {user, msg })

        document.getElementById('txt').value = "";
    }
}
 

socket.on('chat message', (msg) => {

    createMsg("other", msg)
});

function createMsg(type, msg){
    
    let ul = document.getElementById("messages");

    let li = document.createElement('li');
    let div = document.createElement("div")

    let h5 = document.createElement("h5")
    let p = document.createElement("p")

    h5.innerText = msg.user
    p.innerText = msg.msg

    div.appendChild(h5)
    div.appendChild(p)
 
    if(type == "user")
    li.classList.add("msgUser")
    
    li.appendChild(div);    
    ul.appendChild(li);
}