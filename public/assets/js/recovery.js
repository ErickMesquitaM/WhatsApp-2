
const inputEmail = document.getElementsByName("inputRadio")[0]
const inputPhone = document.getElementsByName("inputRadio")[1]
const msg = document.getElementById("msg")
const form = document.getElementById("form")


inputEmail.addEventListener("change", () => {
    changeModel("email", "phone")
})
inputPhone.addEventListener("change", () => {
    changeModel("phone", "email")
})

function verifyInput(){
    if(inputPhone.checked){
        changeModel("phone", "email")
    }
} 

function changeModel(input, prevInput){

    let modelSelected = document.getElementById(input)
    let modelUnselected = document.getElementById(prevInput)

    resetBorder(prevInput)
    
    modelSelected.style.display = "block"
    modelUnselected.style.display = "none"

    modelUnselected.value = ''

    if(input == "email"){
        msg.innerHTML = "Enviaremos um email com o código de acesso"
    } else {
        msg.innerHTML = "Enviaremos um código de acesso para o email que estiver vinculado com esse número de telefone"
    }
}

function validate(){

    let email = document.getElementById("email")
    let phone = document.getElementById("phone")

    if(inputEmail.checked){
        validateData(0)
    } else {
        validateData(1)
    }

    function validateData(type){
        
        if(type == 0){
            if(!email.value){
                borderError("email")
            } else {
                phone.value = ''
                form.submit()
            }
        } else {
            if(isNaN(phone.value) || phone.value.length < 11 || phone.value.length > 15 ){
                borderError("phone")
            } else {
                email.value = ''
                form.submit()
            }
        }
    }

    function borderError(input){
        document.getElementById(input).style.borderColor = "red"
    }
}

function resetBorder(input){
    document.getElementById(input).style.borderColor = "#ced4da"
}