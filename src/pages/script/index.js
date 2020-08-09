//verifica se já esta logado
function checkLoggedIn(){
    let info = JSON.parse(localStorage.getItem('user_info'))
    if (info.logged) {
        window.location.assign("/auth/logged/?api=Bearer "+info.token)
    }
}
window.onload = checkLoggedIn
//enter key for auto sign
//sign in
let passwordInput = document.querySelector('body .app #password')
passwordInput.addEventListener("focus", function() {
    passwordInput.addEventListener('keydown', function (event) {
        if (event.keyCode == 13){
            signIn()
        }
    });
});
//sign up
let passwordSignupInput = document.querySelector('body .app #password-signup')
passwordSignupInput.addEventListener("focus", function() {
    passwordSignupInput.addEventListener('keydown', function (event) {
        if (event.keyCode == 13){
            signUp()
        }
    });
});

function signIn() {
    var user = document.querySelector('body .app #user').value
    var password = document.querySelector('body .app #password').value
    
    if (user == '') {
        createNewNotify("username is empty!",1500,'alert')
    }
    else if (password == '') {
        createNewNotify("password is empty!",1500,'alert')
    }
    else {
        //sign in animation
        signInAnimation()
        axios.post('/signin',{user,password}).then((res)=>{
            console.log(res)
            var userInfo = {
                logged: true,
                user: res.data.user.user,
                name: res.data.user.name,
                email: res.data.user.email,
                id: res.data.user._id,
                token: res.data.token
            }
            //set local storage for save token and logged info
            localStorage.setItem('user_info', JSON.stringify(userInfo))
            window.location.assign("/auth/logged?api=Bearer "+res.data.token)
        }).catch((err)=>{
            console.log(err)
            createNewNotify("Invalid username or password!",1500,'alert')
            //sign in animation
            signInAnimation()
        })
    }
    
}

function signUp(){
    var name = document.querySelector('body #signup #name').value
    var user = document.querySelector('body #signup #userName').value
    var email = document.querySelector('body #signup #email').value
    var password = document.querySelector('body #signup #password-signup').value
    // server side sign up
    axios.post('/signup', {name,user,email,password}).then((res)=>{
        console.log(res.data)
        if (res.data == "user already in use") {
            createNewNotify("Username already in use!",2500,'alert')
        }
        else if (res.data == "email already in use"){
            createNewNotify("Email already in use!",2500,'alert')
        }
        else if (res.data == "error when registering"){
            createNewNotify("Error when registering!",2500,'alert')
        }
        else {
            createNewNotify("Registered successfully!",1500,'success')
        }    
    })
}
// change pages (sign in and sign up pages)
var app = document.querySelector(".app")
var signup = document.querySelector("#signup")
function setNone(){
    if (app.style.display == "none") {
        app.style.display = "flex"
        signup.style.display = "none"
        app.classList.toggle('hide');
    }
    else {
        app.style.display = "none"
        signup.style.display = "flex"
        signup.classList.toggle('hide')
    }
        
}
function cancel(){
    signup.classList.toggle('hide')
    setTimeout(setNone,250)
}
function signUpPage(){
    app.classList.toggle('hide');
    setTimeout(setNone,250)
}
function signInAnimation(){
    app.classList.toggle('hide');
}