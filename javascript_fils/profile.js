
const showSettingBox  = document.querySelector("#setting-box .show-box span");
const settingBox  = document.querySelector("#setting-box ");
const urlApi = "https://tarmeezacademy.com/api/v1/"
const allPost  = document.querySelector(".all-posts");
const loginShow = document.querySelector("#login");
const animationLoded  = document.querySelector(".animation-loded");
const header = document.querySelector("header");
const userProfileCard = document.querySelector(".card-user-profile");
const containerHead  = document.querySelector(".container-head");
const createPostNav  = document.querySelector("#setting-box .create-post-now");
const btnDarkMode = document.querySelector("#setting-box .dark-mode span");

const url = new URL(location.href);
const param = url.search
let idUser = []

for(let i = 0; i < param.split("").length; i ++){
    if(param.split("")[i] !== "=" && param.split("")[i] !== "?"){
        idUser.push(param.split("")[i]);
    }
}

let userIdInDataBase = idUser.join("");

function getUserProfileCard(){
    fetch(`${urlApi}users/${userIdInDataBase}`).then(data => data.json()).then(data => {
        animationLoded.style.display = "none";
        header.classList.add("active");
        userProfileCard.classList.add("active");
        containerHead.style.setProperty("font-size","25px")
        containerHead.style.setProperty("font-weight","bold")
        containerHead.innerHTML = data.data.username;
        userProfileCard.innerHTML = `
        <div class="profile">
        <div class="user-profile-image">
        <img src="${data.data.profile_image}" alt="">
        </div>
        <div class="text">
                <div class="user-name">${data.data.username}</div>
                <div class="name">${data.data.name}</div>
            </div>
        </div>
        <div class="data-anlysis">
        <div class="counter-allcomments"><span>${data.data.comments_count}</span> Counter comment 
        </div>
        <div class="counter-allposts"><span>${data.data.posts_count}</span> Counter posts</div>
        </div>
        `
    })
}

getUserProfileCard()

function getUserPosts(){
    fetch(`${urlApi}users/${userIdInDataBase}/posts`)
        .then(response => response.json())
        .then(result => {
            allPost.innerHTML = "";
            for(let i = 0; i < result.data.length; i ++){            
                allPost.innerHTML += `
                <div class="post" data="${result.data[i].id}">
                <div class="head">
                    
                    <ul class="ctrl-in-post">
                        <li class="delete-post">Delete this post</li>
                        <li class="update-post">Update this post</li>
                    </ul>
                
                        <div class="user-profile">
                        
                            <img src="${result.data[i].author.profile_image}" alt="" class="user-photo">
                            <div class="text">
                                <h2 class="user-name">${result.data[i].author.username}</h2>
                                <span class="date-post">${result.data[i].created_at}</span>
                                </div>
                                </div>
                                </div>
                                <div class="image-post">
                                <img src="${result.data[i].image}" alt="">
                                </div>
                                <div class="footer-post">
                                <div class="content">
                                <p class="text-post">${result.data[i].body}</p>
                                </div>
                                <div class="comments center-flex">
                                <span class="massege">you must log in</span>
                                <div class="counter-comment">comments(${result.data[i].comments_count})</div>
                                </div>
                    </div>
                    </div>
                    `
                
        } 
        document.querySelectorAll(".post .user-photo").forEach( img => {
            if(img.src.endsWith("[object%20Object]")){
                img.src = "../images/profile_null.jfif";
            }
        })
        if(document.querySelector(".user-profile-image img").src.endsWith("[object%20Object]")){
            document.querySelector(".user-profile-image img").src = "../images/profile_null.jfif";
        }
        checkAuthor(); 
        checkDarkeMode();
                     
    })
}

getUserPosts();



showSettingBox.addEventListener("click", () => {
    settingBox.classList.toggle("active");
    showSettingBox.classList.toggle("active");
})


loginShow.addEventListener("click", () => {
    sessionStorage.clear();
    location.replace("../html_fils/index.html")
})




function showComment(){
    document.addEventListener("click", (e) => {
        if(e.target.className === "counter-comment"){
            location.href = `../html_fils/comments.html?=${e.target.parentElement.parentElement.parentElement.getAttribute("data")}`;   
        }
    })
}

showComment()



function checkAuthor(){
    if(userIdInDataBase == sessionStorage.getItem("userId")){
        const deletAndUpdataMyPost = document.querySelectorAll("#btn-delet-update")
        deletAndUpdataMyPost.forEach(e => {
            e.classList.add("active");
        })
    }
}

document.addEventListener("click", (e) => {
    if(e.target.id === "btn-delet-update"){
        e.target.nextElementSibling.classList.toggle("active");
    }})

window.onscroll = () => {
    document.querySelectorAll(".ctrl-in-post").forEach(e => {
        e.classList.remove("active");
    })
}

// document.addEventListener("click", e => {
//     if(e.target.className === "delete-post"){
//         const idPost = e.target.parentElement.parentElement.parentElement.getAttribute("data");
//         function deletePost (){
//             fetch('https://tarmeezacademy.com/api/v1/posts/'+ idPost , {
//                 method: 'DELETE',
//                 headers: {                  
//                     'authorization': 'Bearer 76872|HMmXjCfBt4h6pMl6aUsLKhldiKQe3d7Dug9TlD9A',
//                 }
//             }).then(data => data.json()).then(data => {
//                 console.log
//             })
 

//                 document.querySelector(".massege-post").classList.toggle("active");
//                 setTimeout(() => {
//                     document.querySelector(".massege-post").classList.toggle("active");
//                 }, 3000);
//                 getUserProfileCard();
//                 getUserPosts();
           
//             deletePost()
//         }
//     }
// })

// document.addEventListener("click", e => {
//     if(e.target.className === "update-post"){
//         const idPost = e.target.parentElement.parentElement.parentElement.getAttribute("data");
//         let myFormData = new FormData();
//         let myHeaders = new Headers();
//         myFormData.append("body", "Update post");
//         myFormData.append("title", "Update post");
//         myFormData.append("image", "Update post");
//         myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
//         myHeaders.append("Accept", "application/json");
//         function updatePost (){
//             let options = {
//                 method: "PUT",
//                 body: myFormData,
//                 headers: myHeaders
//             }
//             animationLoded.style.display = "block";
//             fetch(`https://tarmeezacademy.com/api/v1/posts/${idPost}`,options).then(data => data.json()).then(data => {
//                 console.log(data)
//                 animationLoded.style.display = "none";
//                 document.querySelector(".massege-post").classList.toggle("active");
//                 setTimeout(() => {
//                     document.querySelector(".massege-post").classList.toggle("active");
//                 }, 3000);
//                 getUserProfileCard();
//                 getUserPosts();
//             })
//         }
//         updatePost()
//     }
// })


document.addEventListener("click", (e) => {
    if(e.target.className === "myprofile" || e.target.className === "myprofile-text" || e.target.className === "my-profile-img"){
        location.href = `../html_fils/profile.html?${sessionStorage.getItem("userId")}`;
    }
})

document.querySelector(".myprofile img").src = sessionStorage.getItem("userprofile");


createPostNav.addEventListener("click", () => {
    location.href = "../html_fils/post_new.html";
})


const listColors = document.querySelectorAll(".background-color .list-colors li");

listColors.forEach(e => {
    e.addEventListener("click", e => {
        listColors.forEach(e => {e.classList.remove("active");})
        document.body.style.backgroundColor = e.target.getAttribute("data-color");
        e.target.classList.add("active");
        localStorage.setItem("backgroundColor", e.target.getAttribute("data-color"));
    })
})



let stopInterval = "";
let intervalPlay = false;
let listRandomColors = [];
const btnRandomBackgroundColor = document.querySelector(".random-background-color")
btnRandomBackgroundColor.addEventListener("click", () => {
    if(btnRandomBackgroundColor.children[1].classList.contains("active")){
        btnRandomBackgroundColor.children[1].classList.toggle("active");
        btnRandomBackgroundColor.children[1].innerHTML = "toggle_off";
        intervalPlay = false;
        randomBackgroundColor();
    }else {
        btnRandomBackgroundColor.children[1].classList.toggle("active");
        btnRandomBackgroundColor.children[1].innerHTML = "toggle_on";
        listColors.forEach(color => {
            color.classList.remove("active")
            listRandomColors.push(color.getAttribute("data-color"));
        })
        intervalPlay = true;
        randomBackgroundColor(); 
    }
    
})

function randomBackgroundColor(){
    if(intervalPlay === true){
        stopInterval = setInterval(() => {
            document.body.style.backgroundColor = listRandomColors[Math.floor(Math.random() * listRandomColors.length)];
        }, 10000);
    }else {
        clearInterval(stopInterval);
    }
}








function darkModeTools(){
    if(btnDarkMode.classList.contains("active")){
        stopDarkMode();
    }else {
        playDarkMode()
    }
}



function playDarkMode(){
    localStorage.setItem("dark_mode", "On");
    btnDarkMode.classList.add("active");
    btnDarkMode.textContent = "toggle_on";
    document.querySelectorAll(".all-posts .post").forEach(e => {
        e.style.backgroundColor = "rgba(0,0,0,.8)";
    })
    document.querySelectorAll(".all-posts .post .text h2").forEach(e => {
        e.style.color = "white";
    })
    document.querySelectorAll(".all-posts .post .text span").forEach(e => {
        e.style.color = "white";
    })
    document.querySelectorAll(".all-posts .post  p").forEach(e => {
        e.style.color = "white";
    })
    document.querySelectorAll(".all-posts .post .counter-comment").forEach(e => {
        e.style.color = "white";
    })
    document.querySelector("header").style.backgroundColor = "rgba(0,0,0, 1)";
    document.querySelector(".show-box span").style.color = "white";
    document.querySelector("header .container-head").style.color = "white";
    document.body.style.backgroundColor = "rgba(0, 0, 139, 0.762)";
    document.querySelector(".card-user-profile").style.backgroundColor = "rgba(0,0,0,.8)"
    document.querySelector(".card-user-profile .user-name").style.color = "white"
    document.querySelector(".card-user-profile .name").style.color = "white"
    document.querySelector(".card-user-profile .counter-allcomments").style.color = "white"
    document.querySelector(".card-user-profile .counter-allposts").style.color = "white"
}


function stopDarkMode(){
    localStorage.setItem("dark_mode", "Off");
    btnDarkMode.classList.remove("active");
    btnDarkMode.textContent = "toggle_off";
    document.querySelectorAll(".all-posts .post").forEach(e => {
        e.style.backgroundColor = "white";
    })
    document.querySelectorAll(".all-posts .post .text h2").forEach(e => {
        e.style.color = "black";
    })
    document.querySelectorAll(".all-posts .post .text span").forEach(e => {
        e.style.color = "black";
    })
    document.querySelectorAll(".all-posts .post  p").forEach(e => {
        e.style.color = "black";
    })
    document.querySelectorAll(".all-posts .post  .counter-comment").forEach(e => {
        e.style.color = "black";
    })
    document.querySelector("header").style.backgroundColor = "white";
    document.querySelector(".show-box span").style.color = "";
    document.querySelector("header .container-head").style.color = "black";
    document.body.style.backgroundColor = "";
    document.querySelector(".card-user-profile").style.backgroundColor = "white"
    document.querySelector(".card-user-profile .user-name").style.color = "black"
    document.querySelector(".card-user-profile .name").style.color = "black"
    document.querySelector(".card-user-profile .counter-allcomments").style.color = "black"
    document.querySelector(".card-user-profile .counter-allposts").style.color = "black"
}







function darkMode(){
    btnDarkMode.addEventListener("click", () => {
        darkModeTools()
    })
}

darkMode();

function checkDarkeMode(){
    if(sessionStorage.getItem("token") !== null){
        if(localStorage.getItem("dark_mode") === "On"){
            playDarkMode();
        }else {
            return
        }
    }
}
checkDarkeMode();
const logoutNav = document.querySelector(".log-out-nav");

logoutNav.addEventListener("click", () => {
    loginShow.click();
})
