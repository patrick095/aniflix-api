const info = JSON.parse(localStorage.getItem('user_info'))
function showUserNameOnUserOptions(name){
    if (name.indexOf(' ') >= 0) {
        var firstName = name.split(" ")
        document.getElementById('userName').innerHTML = firstName[0]+' '+firstName[firstName.length-1]
        document.getElementById('user').innerHTML = firstName[0]
    }
    else {
        document.getElementById('userName').innerHTML = name
    }
}

if (info.logged) {
    showUserNameOnUserOptions(info.name)
    var controlPanelLink = document.querySelector('body .navbar #controlPanelLink')
    var homeLink = document.querySelector('body .navbar #homeLink')
    var scoreboardLink = document.querySelector('body .navbar #scoreboardLink')
    homeLink.setAttribute('href',  '/auth/logged?api=Bearer '+info.token)
    scoreboardLink.setAttribute('href', '/scoreboard?id='+info.id)
    controlPanelLink.setAttribute('href', '/auth/controlpanel?api=Bearer '+info.token)
}
