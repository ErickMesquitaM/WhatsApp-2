
const inputImg = document.getElementById("inputImage")
const img = document.getElementById("img")
const boardPWd = document.getElementById("boardPwd")
var inpupCheckBox = document.getElementById("inputPwd")

if( !inpupCheckBox.checked ){
    boardPWd.classList.add("hidden")
} else {
    try{ boardPWd.classList.remove("hidden") } catch{}
}

inputImg.addEventListener("change", updateImage)

function clickLabel(){
    inputImg.click()
}

function updateImage() {

    let file = inputImg.files[0]
    if(file){
        let reader = new FileReader()
        reader.addEventListener("load", () => {
            img.setAttribute("src", reader.result)
        })
        reader.readAsDataURL(file)
    }
}

function changeStatusPwd(){
    document.getElementById("pwd").value = ''
    document.getElementById("confirmPwd").value = ''

    boardPWd.classList.toggle("hidden")
}


function validate(){

    let form = document.getElementById("form")

    let name = document.getElementById("name").value
    let checkBox = inpupCheckBox.checked
    let pwd = document.getElementById("pwd").value
    let confirmPwd = document.getElementById("confirmPwd").value

    if(!name){
        errorBorder("name")
        form.name.focus()

    } else if(checkBox){

        if(pwd.length >= 6 && pwd == confirmPwd){
            form.submit()
        } else {
            errorBorder("pwd")
            form.pwd.focus()
        }

    } else {
        form.submit()
    }
}

function errorBorder(input){
    document.getElementById(input).style.borderColor = "rgb(255, 70, 70)"
}

function resetBorder(input){
    document.getElementById(input).style.borderColor = "#ced4da"
}
