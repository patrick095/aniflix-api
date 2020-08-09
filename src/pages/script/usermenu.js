//User menu
var menuOpen = false
//menu
function closeMenu() {
    if (menuOpen == false) {
        return
    }
    menuOpen = false
    console.log("remove")
    var menu = document.querySelector('body .menuUser')
    menu.remove()
}
function openMenu(){
    if (menuOpen == false) {
        var app = document.querySelector('body')
        var menu = document.createElement('div')
        var logOut = document.createElement('a')
        var profile = document.createElement('a')
        var settings = document.createElement('a')
        var logOutText = document.createTextNode('Logout')
        var profileText = document.createTextNode('profile')
        var settingsText = document.createTextNode('settings')
        logOut.setAttribute('href', '#')
        logOut.setAttribute('onclick', 'logout()')
        profile.setAttribute('href', '#')
        settings.setAttribute('href', '#')
        menu.setAttribute('class', 'menuUser')
        logOut.appendChild(logOutText)
        profile.appendChild(profileText)
        settings.appendChild(settingsText)
        menu.appendChild(profile)
        menu.appendChild(settings)
        menu.appendChild(logOut)
        app.appendChild(menu)
        return menuOpen = true
    }
    else if (menuOpen) {
        closeMenu()
    }
}

function logout(){
    function clearAll(){
        localStorage.clear()
    window.location.assign('/')
    }
    createNewNotify("successfully logged out!",1500,'success')
    setTimeout(clearAll,2300)
}