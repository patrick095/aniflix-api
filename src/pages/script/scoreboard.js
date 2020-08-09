var socket = io('/')
var points, sets, homeScore, visitorScore, homeSet, visitorSet, currentSet,homeName,visitorName
var id = window.location.search.replace("?id=", "")
socket.emit('Scoreboard',id)
socket.on('ScoreboardNow', result =>{
    console.log(result)
    homeScore = result.homeScore
    visitorScore = result.visitorScore
    homeSet = result.homeSet
    visitorSet = result.visitorSet
    points = result.points
    sets = result.sets
    currentSet = result.currentSet
    homeName = result.homeName
    visitorName = result.visitorName
    renderScores()
})
function renderScores(){
    document.getElementById('homeScore').innerHTML = homeScore
    document.getElementById('visitorScore').innerHTML = visitorScore
    document.getElementById('homeSet').innerHTML = homeSet
    document.getElementById('visitorSet').innerHTML = visitorSet
    document.getElementById('currentSet').innerHTML = currentSet
    if (homeName == undefined || homeName == '') {
        document.getElementById('homeName').innerHTML = 'Team A'
    }
    else {
       document.getElementById('homeName').innerHTML = homeName 
    }
    if (visitorName == undefined || visitorName == '') {
        document.getElementById('visitorName').innerHTML = 'Team B'
    }
    else {
       document.getElementById('visitorName').innerHTML = visitorName  
    }
}