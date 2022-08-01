const form = document.getElementById("form")

function validate(){

    try{
        let pwd = document.getElementById("pwd").value

        if(pwd == ''){
            borderError()
        } else {
            form.submit()
        }

    } catch {
        form.submit()
    }
}


function borderError(){
    document.getElementById("pwd").style.borderColor = "red"

    try{
        document.getElementById("iconError").style.display = "none"
    } catch {}
}

function resetBorder(){
    document.getElementById("pwd").style.borderColor = "#ced4da"
}