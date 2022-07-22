function validate(){
    let pwd = document.getElementById("pwd")
    let pwd2 = document.getElementById("confirmPwd")
    let form = document.getElementById("form")

    if(pwd.value != '' && pwd.value.length >= 6 && pwd.value == pwd2.value){
        form.submit()
    } else {
        pwd2.style.borderColor = "red"
    }
}

function resetBorder(){
    document.getElementById("confirmPwd").style.borderColor = "#ced4da"
}