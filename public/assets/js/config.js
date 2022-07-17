
const inputImg = document.getElementById("inputImg")
const img = document.getElementById("img")
inputImg.addEventListener("change", updateImage)

const button = document.getElementById("button")

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

button.addEventListener("click", validate)

function validate(){

    var form = document.getElementById("form")
    let phone = document.getElementById("phone").value
    let icon = document.getElementById("iconError")
    
    if(isNaN(phone)){
        icon.style.display = "block"
    } else {

        icon.style.display = "none"
        form.submit()
    }
}

function logout(){
    window.location.pathname = "/logout"
}