const inputImg = document.getElementById("inputImg")
const img = document.getElementById("img")
const msgCopy = document.getElementById("infoCopy")

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

function back(){
    let link = window.location.pathname.slice(0, this.length - 7)

    window.location.pathname = link
}

function exit(){
    let link = window.location.pathname.slice(0, this.length - 7) + "/exit"

    window.location.pathname = link
}
function redirectUser(id){
    window.location.pathname = "user/" + id
}

function remove(elem){
    let path = window.location.pathname
    let link = path.slice(0, path.length - 6 ) + elem.attributes.id.value

    window.location.pathname = link
}


function copyLink(){
    let link = window.location.href.slice(0, this.length - 7)

    navigator.clipboard.writeText( link )
    animationConfirmCopy()
}

function animationConfirmCopy(){

    infoCopy.style.display = "block"
    let id = null
    let i = 0

    id = setInterval(frame, 3)

    function frame(){

        if(i == 100){

            clearInterval(id)
            id = setInterval(frameReverse, 3)
        } else {
            infoCopy.style.opacity = i + "%"
            i += 5
        }
    }

    function frameReverse(){

        if(i == 0){
            infoCopy.style.display = "none"
            clearInterval(id)

        } else {
            infoCopy.style.opacity = i + "%"
            i -= 5
        }
    }
}