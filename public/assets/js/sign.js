
const spin = document.getElementById('spin')

async function validate(){

    spin.style.display = "block"

    var form = document.getElementById("form")
    let pwd = document.getElementById("pwd")
    let confirmPwd = document.getElementById("confirmPwd")
    let phone = document.getElementById("phone")

    if(pwd.value != confirmPwd.value){
        errorBorder("confirmPwd")
    } else if(isNaN(phone.value)){
        errorBorder("phone")
    } else {
        await form.submit()
    }

    spin.style.display = "none"
}


function showMsnEmail(){
    let elem = document.getElementById("msnEmail")
       
    if(elem.style.display == "block"){
        elem.style.display = "none"    
    } else {    
        elem.style.display = "block"           
    }
}

function errorBorder(input){
    document.getElementById(input).style.borderColor = "rgb(255, 70, 70)"
}

function resetBorder(input){
    document.getElementById(input).style.borderColor = "#ced4da"

    try{
        document.getElementById("iconEmail").style.display = "none"
    }catch{}
}
