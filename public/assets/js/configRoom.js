const inputImg = document.getElementById("inputImg")
const img = document.getElementById("img")
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