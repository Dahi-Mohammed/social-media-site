const textNewPost = document.querySelector("#text-post");
const imageNewPost = document.querySelector("#image-new-post");
const sendPost = document.querySelector("#btn-new-post");
const urlApi = "http://tarmeezacademy.com/api/v1/";
const animationLoded = document.querySelector(".animation-loded");
animationLoded.style.display = "none";


function createNewPost(){
    let formData = new FormData();
    let header = new Headers();
    header.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    header.append("Accept", "Application/json");
    formData.append("body", textNewPost.value);
    formData.append("image", imageNewPost.files[0]);
    let option = {
        method: "POST",
        headers: header,
        body: formData
    }
    animationLoded.style.display = "flex";
    fetch(`${urlApi}posts`,option).then(data => data.json()).then(response => {
        location.replace("../html_fils/index.html")
    })
}


sendPost.addEventListener("click", () => {
    createNewPost();
})