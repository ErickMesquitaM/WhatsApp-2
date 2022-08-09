
async function validate(){

    var form = document.getElementById("form")
    let pwd = document.getElementById("pwd")
    let email = document.getElementById("email").value
    let confirmPwd = document.getElementById("confirmPwd")
    let phone = document.getElementById("phone")

    if(pwd.value != confirmPwd.value){
        errorBorder("confirmPwd")
    } else if(isNaN(phone.value)){
        errorBorder("phone")
    } else if(email.length < 5){
        errorBorder("email")
    } else {
        await form.submit()
    }
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
        document.getElementById("msnEmail").style.display = "none"
    }catch{}
}
