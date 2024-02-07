const header = document.querySelector("header");
const urlApi = "https://tarmeezacademy.com/api/v1/posts/";
const animationLoad = document.querySelector(".animation-loded-comment");
const comments = document.querySelector(".comment-content .box");
const commentMessge = document.querySelector(".comment-content");
const allPosts = document.querySelector(".all-posts");
const userPhoto = document.querySelector(".user-profile .user-photo");
const userName = document.querySelector(".user-profile .user-name");
const datePost = document.querySelector(".user-profile .date-post");
const imagePost = document.querySelector(".image-post img");
const bodyPost = document.querySelector(".post .content p");
const userNameAuthor = document.querySelector("header .user-name h1");
const commentnew = document.querySelector('.create-comment input[type="text"]');
const sendComment = document.querySelector(".create-comment .send");
const backBtn = document.querySelector(".all-posts .post .head .back");
const url = new URL(location.href);
const param = url.search
let idPost = []
for(i of param.split("")){
    if(i !== "=" && i !== "?"){
        idPost.push(i)
    }
}

allPosts.style.display = "none";

function getPost(){
    fetch(`${urlApi}${idPost.join("")}`).then(data => data.json()).then(response => {
        animationLoad.style.display = "none";
        header.style.display = "flex";
        allPosts.style.display = "block";
        userPhoto.src = response.data.author.profile_image;
        imagePost.src = response.data.image;
        userName.textContent = response.data.author.username;
        userNameAuthor.textContent = response.data.author.username;
        datePost.textContent = response.data.created_at;
        bodyPost.textContent = response.data.body;
        getCommnts(response);
        
            if(document.querySelector(".post .user-photo").src.endsWith("[object%20Object]")){
                document.querySelector(".post .user-photo").src = "../images/profile_null.jfif";
        }
        
    })
}

getPost()


function getCommnts(res){
    if(res.data.comments.length == 0){
        let messageEmptyComments = document.createElement("span");
        messageEmptyComments.className = "massege-comment-empty";
        messageEmptyComments.textContent = "No comment yet";
        commentMessge.style.textAlign = "center";
        commentMessge.prepend(messageEmptyComments);
    }else{
        comments.innerHTML = "";
        document.querySelector(".massege-comment-empty") != null ? document.querySelector(".massege-comment-empty").style.opacity = 0 : "";        for(i of res.data.comments){
            comments.innerHTML += `
            <div id="comment">
            <img src="${i.author.profile_image}" alt="">
            <div class="text">
            <h3 class="user-name-">${i.author.username}</h3>
            <p>${i.body}</p>
            </div>
            </div>
            `
        }
        checkDarkeMode();
        if(document.querySelector(".post #comment img").src.endsWith("[object%20Object]")){
            document.querySelector(".post #comment img").src = "../images/profile_null.jfif";
        }   
    }
}



sendComment.addEventListener("click", () => {
    sendComment.classList.remove("active");
    sendCommentFunc();
})


function sendCommentFunc(){
    const headers = new Headers();
    const formData = new FormData();
    formData.append("body", commentnew.value);
    headers.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    headers.append("Accept", "application/json");
    
    const option = {
        method: "POST",
        headers: headers,
        body: formData
    }
    fetch( `${urlApi}${idPost.join("")}/comments`,option).then(data => data.json()).then(response => {
        commentnew.value = "";
        document.querySelector(".massege-post").classList.toggle("active");
        setTimeout(() => {
            document.querySelector(".massege-post").classList.toggle("active");           
        }, 1500);
        getPost();
    })
}



function checkCommentInput() {
    commentnew.addEventListener("input", () => {
        if(commentnew.value.length > 0){
            sendComment.classList.add("active");
        }else{
            sendComment.classList.remove("active")
        }
    })
}

checkCommentInput();



backBtn.addEventListener("click", () => {
    history.back();
})




function playDarkMode(){
    document.querySelector(".all-posts .post").style.backgroundColor = "rgba(0,0,0,.8)";
    document.querySelector(".all-posts .post .text h2").style.color = "white";
    document.querySelector(".all-posts .post .text span").style.color = "white"; 
    document.querySelector(".all-posts .post  p").style.color = "white";
    document.querySelector("header").style.backgroundColor = "rgba(0,0,0, 1)";
    document.querySelectorAll(".post .comment-content #comment .text").forEach(e => {
        e.style.backgroundColor = "rgba(255.255,255,.7)"
    })
    
    document.querySelector(".post .create-comment ").style.backgroundColor = "black";
    document.querySelector(".post .create-comment input").style.backgroundColor = "white";
    
}


function checkDarkeMode(){
    if(sessionStorage.getItem("token") !== null){
        if(localStorage.getItem("dark_mode") === "On"){
            playDarkMode();
        }else {
            return
        }
    }
}
