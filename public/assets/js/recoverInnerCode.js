
const form = document.getElementById("form")


function validate(){

    let code = document.getElementById("code").value

    console.log(code.length)

    if(code.length != 4){
        document.getElementById("code").style.borderColor = "red"
    } else {
        form.submit()
    }
}

function resetBorder(){
    document.getElementById("code").style.borderColor = "#ced4da"
}