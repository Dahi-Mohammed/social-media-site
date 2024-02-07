const header = document.querySelector("header");
const loginShow = document.querySelector("#login");
const overLay  = document.querySelector(".over-lay");
const loginCard  = document.querySelector(".login-card");
const buttonsCard  = document.querySelector(".login-card .buttons");
const login  = document.querySelector("#login-btn");
const register  = document.querySelector("#register");
const headerPage  = document.querySelector("#head-page");
const allPost  = document.querySelector(".all-posts");
const animationLoded  = document.querySelector(".animation-loded");
const showSettingBox  = document.querySelector("#setting-box .show-box span");
const settingBox  = document.querySelector("#setting-box ");
const showPassword  = document.querySelector(".login-card .password span");
const imageInput  = document.querySelector('.login-card input[type="file"]');
const userNameInput  = document.querySelector(".login-card #username");
const nameInput  = document.querySelector(".login-card #name");
const passInput  = document.querySelector("#pass");
const message  = document.querySelector(".box-message");
const containerHead  = document.querySelector(".container-head");
const authorContent  = document.querySelector("#author");
const profileImage  = document.querySelector("#author img");
const authorName  = document.querySelector("#author h1");
const newPostBtn  = document.querySelector("#new-post");
const newPostBox  = document.querySelector(".box-create-post");
const authorImg  = document.querySelector(".box-create-post img");
const updatePage  = document.querySelector(".box-create-post .update-data");
const createPostNav  = document.querySelector("#setting-box .create-post-now");
const btnDarkMode = document.querySelector("#setting-box .dark-mode span");

let show = 0 ;
let showPass = 0 ;
const urlApi = "http://tarmeezacademy.com/api/v1/";
let infiniteLoded = 1;




loginShow.addEventListener("click", () => {
    
    switch(show){
        case 0:
            loginCard.classList.toggle("active");
            overLay.classList.toggle("active");
            settingBox.classList.remove("active");
            showSettingBox.classList.remove("active");
            loginShow.textContent = "close";
            show ++;
            break;
        case 1:
            loginCard.classList.toggle("active");
            overLay.classList.toggle("active");
            settingBox.classList.remove("active");
            showSettingBox.classList.remove("active");
            loginShow.textContent = "login";
            show --;
            break;
        case 2:
            sessionStorage.clear();
            location.reload()
            break;
        }
})


function registerFunc(){
    message.classList.toggle("active");
    let formData= new FormData();
    let header= new Headers();
    formData.append("username", userNameInput.value);
    formData.append("password", passInput.value);
    formData.append("name", nameInput.value);
    formData.append("image", imageInput.files[0]);
    header.append("Accept", "Application/json");
    let option = {
        method: "POST",
        body: formData,
        headers: header
    }
    fetch(`${urlApi}register`, option).then(data => data.json()).then(response => {
        messageTextAndSetStorage(response);
    })
}

register.addEventListener("click", () => {
    if(register.classList.contains("on")){
        registerFunc();
        return;
    }
    imageInput.style.display = "block";
    let index = 0;
    nameInput.style.display = "block";
    buttonsCard.style.flexDirection = "column-reverse";
    login.classList.add("off");
    let newAccountText = "New account";
    let setOne
    headerPage.textContent = "";
    setOne = setInterval(() => {
        headerPage.textContent += newAccountText[index];
        index ++
        if(index === newAccountText.length){
            clearInterval(setOne)
        }
    }, 100)
    register.classList.add("on");
    
    
})


function messageTextAndSetStorage (response){
    message.innerHTML = `<div class="circle"></div>`;
    if(response.message != undefined){
        message.textContent = response.message;
        setTimeout(() => {
            message.classList.remove("active");
            message.textContent = "";
            passInput.value = "";
            nameInput.value = "";
            userNameInput.value = "";
        }, 5000);
    }else{
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("userId", response.user.id);
        sessionStorage.setItem("username", response.user.username);
        sessionStorage.setItem("userprofile", response.user.profile_image);
    }
    if(sessionStorage.getItem("token") !== null){
        loginShow.click();
        setStorge();
        location.reload();
        message.classList.toggle("active");
    }
}

function loginFunc(){
    message.classList.toggle("active");
    let formData = new FormData();
    let header   = new Headers();
    formData.append("username", userNameInput.value);
    formData.append("password", passInput.value);
    header.append("Accept", "Application/json");
    let option = {
        headers: header,
        method: "POST",
        body: formData
    }
    fetch(`${urlApi}login`, option).then((data) => data.json()).then( response => {
        messageTextAndSetStorage(response);
    })
}

setStorge()

function setStorge(){
    if(sessionStorage.getItem("token") !== null ) {
        authorName.textContent = sessionStorage.getItem("username");
        authorContent.classList.add("active");
        containerHead.style.justifyContent = "space-between";
        newPostBox.classList.add("active");
        loginShow.textContent = "logout";
        authorImg.src = sessionStorage.getItem("userprofile");
        show = 2;
    }
    if(sessionStorage.getItem("token") !== null){
        if(sessionStorage.getItem("userprofile").length > 17){
            profileImage.src = sessionStorage.getItem("userprofile");
            
        }
    }
}



login.addEventListener("click", () => {
    loginFunc()
})




function getPosts (reload) {
    infiniteLoded === 1 ? newPostBox.classList.remove("active") : "";
    let requestOptions = {
        method: "GET"
    };
    fetch(`${urlApi}posts?page=${reload}`,requestOptions)
    .then(response => response.json())
    .then(result => {
        animationLoded.style.display = "none";
        sessionStorage.getItem("token") !== null ? newPostBox.classList.add("active") : allPost.style.marginTop = "90px";
        header.style.display = "flex";
        for(let i = 0; i < result.data.length; i ++){ 
            allPost.innerHTML += `
            <div class="post" data="${result.data[i].id}">
                <div class="head">
                <span class="massege">you must log in</span>
                        <div class="user-profile" user-id="${result.data[i].author.id}">
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

        

        if(btnDarkMode.classList.contains("active")){
            playDarkMode();
        }else {
        }
        document.querySelectorAll(".post .user-photo").forEach( img => {
            if(img.src.endsWith("[object%20Object]")){
                img.src = "../images/profile_null.jfif";
            }
        })
    })
}













getPosts(infiniteLoded);

function checkFinalPage(){
    let windowHeight = window.innerHeight;
    let pageHeight = document.body.offsetHeight;
    let windowScrollY = window.scrollY;
    if(windowScrollY  > pageHeight - windowHeight){
        infiniteLoded ++
        getPosts(infiniteLoded);
    }
    
}

window.onscroll = checkFinalPage



showSettingBox.addEventListener("click", () => {
    if(sessionStorage.getItem("token") !== null){
        settingBox.classList.toggle("active");
        showSettingBox.classList.toggle("active");
        if(loginCard.classList.contains("active")){
            loginCard.classList.remove("active");
            overLay.classList.remove("active");
        }
    }else{
        document.querySelector(".massege-setting").style.display = "block";
        setTimeout(() => {
            document.querySelector(".massege-setting").style.display = "none";          
        }, 3000);
    }
})


showPassword.addEventListener("click", () => {
    if(showPass === 0){
        showPassword.textContent = "visibility";
        passInput.type = "text";
        showPass ++
    }else{
        showPassword.textContent = "visibility_off";
        passInput.type = "password";
        showPass --
    }
})





newPostBtn.addEventListener("click", () => {
    location.href = "../html_fils/post_new.html";
})

function showComment(){
    document.addEventListener("click", (e) => {
        if(e.target.className === "counter-comment"){
            if(sessionStorage.getItem("token") !== null){
                location.href = `../html_fils/comments.html?=${e.target.parentElement.parentElement.parentElement.getAttribute("data")}`;   
            }else{
                e.target.previousElementSibling.classList.toggle("active");
                setTimeout(() => {
                    e.target.previousElementSibling.classList.remove("active");
                }, 2000);
            }
        }
    })
}

showComment()


updatePage.addEventListener("click", () => {
    location.reload();
})

document.addEventListener("click", (img) => {
    if(img.target.className === "user-photo"){
        if(sessionStorage.getItem("token") !== null){
            window.open(`../html_fils/profile.html?${img.target.parentElement.getAttribute("user-id")}`);
        }else{
           img.target.parentElement.previousElementSibling.classList.add("active");
           setTimeout(() => {
                img.target.parentElement.previousElementSibling.classList.remove("active");  
            }, 2000);
        }
    }
})




authorContent.addEventListener("click", () => {
    location.href = `../html_fils/profile.html?${sessionStorage.getItem("userId")}`;
})

document.addEventListener("click", (e) => {
    if(e.target.className === "myprofile" ||e.target.className === "myprofile-text" || e.target.className === "my-profile-img"){
        location.href = `../html_fils/profile.html?${sessionStorage.getItem("userId")}`;
    }
})
document.querySelector(".myprofile .my-profile-img").src = sessionStorage.getItem("userprofile");


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
    document.querySelector("header").style.backgroundColor = "rgba(0,0,0,.8)";
    document.querySelector(".show-box span").style.color = "white";
    document.querySelector("header h1").style.color = "white";
    document.querySelector(".box-create-post").style.backgroundColor = "rgba(0,0,0,.8)";
    document.querySelector(".box-create-post #new-post").style.backgroundColor = "white";
    document.body.style.backgroundColor = "rgba(0, 0, 139, 0.762)";
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
    document.querySelector("header h1").style.color = "black";
    document.querySelector(".box-create-post").style.backgroundColor = "white";
    document.querySelector(".box-create-post #new-post").style.backgroundColor = "";
    document.body.style.backgroundColor = "";
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