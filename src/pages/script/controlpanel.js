const info = JSON.parse(localStorage.getItem('user_info'))
function showUserNameOnUserOptions(name){
    if (name.indexOf(' ') >= 0) {
        var firstName = name.split(" ")
        document.getElementById('userName').innerHTML = firstName[0]+' '+firstName[firstName.length-1]
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

//socket io
var socket = io('/')
//global variables
var points,sets,homeScore,visitorScore,homeSet,visitorSet,currentSet,
homeName,visitorName,taiBreak,set1,set2,set3,set4,set5

function loadDOMValues(){
    points = document.getElementById('Points').value
    sets = parseInt(document.getElementById('Sets').value)
    taiBreak = document.getElementById('taiBreak').value
    homeScore = document.getElementById('homeScore').innerHTML
    visitorScore = document.getElementById('visitorScore').innerHTML
    homeSet = document.getElementById('homeSet').innerHTML
    visitorSet = document.getElementById('visitorSet').innerHTML
    currentSet = document.getElementById('currentSet').innerHTML
    homeName = document.getElementById('homeName').value
    visitorName = document.getElementById('visitorName').value
}
loadDOMValues()
//load new Values
socket.emit('Scoreboard',info.id)
socket.on('ScoreboardNow', result =>{
    if (result == null){
        loadDOMValues()
        updateDB()
    }
    homeScore = result.homeScore
    visitorScore = result.visitorScore
    homeSet = result.homeSet
    visitorSet = result.visitorSet
    points = result.points
    sets = result.sets
    taiBreak = result.taiBreak
    currentSet = result.currentSet
    homeName = result.homeName
    visitorName = result.visitorName
    set1 = result.set1
    set2 = result.set2
    set3 = result.set3
    set4 = result.set4
    set5 = result.set5
    renderScores()
    renderSetsResults()
    
})

    
function updateDB(){
    var data = {
        homeScore, visitorScore, homeSet, visitorSet, sets, points, currentSet, homeName,
        visitorName, taiBreak, userId: info.id
    }
    socket.emit('changeScoreboard',data)
}

function checkNumbersAndRenderize(){
    if (homeScore >= 0 && visitorScore >= 0 && homeSet >= 0 && visitorSet >= 0) {
        renderScores()
    }
    else if (homeScore < 0) {
        homeScore = 0
    }
    else if (visitorScore < 0) {
        visitorScore = 0
    }
    else if (homeSet < 0) {
        homeSet = 0
    }
    else if (visitorSet < 0) {
        visitorSet = 0
    }
    else {
        return alert('Error!')
    }
}
function renderSetsResults() {
    if (document.getElementById('setsDiv')) {
        removeSetsDiv()
    }
    var settingsDiv = document.getElementById('settingsButtons')
    var setsDiv = document.createElement('div')
    setsDiv.setAttribute('id', 'setsDiv')
    settingsDiv.appendChild(setsDiv)
    for (let i = 0; i < sets; i++) {
        let setRender = document.createElement('div')
        let setSpan = document.createElement('span')
        let setText = document.createTextNode('Set'+(i+1)+': ')
        setSpan.appendChild(setText)
        let setResult = document.createElement('span')
        setRender.appendChild(setSpan)
        setRender.appendChild(setResult)
        setRender.setAttribute('class','setRender')
        setResult.setAttribute('id','set'+(i+1))
        setsDiv.appendChild(setRender)
    }
    showSetsResults()
}

function renderScores(){
    document.getElementById('homeScore').innerHTML = homeScore
    document.getElementById('visitorScore').innerHTML = visitorScore
    document.getElementById('homeSet').innerHTML = homeSet
    document.getElementById('visitorSet').innerHTML = visitorSet
    document.getElementById('currentSet').innerHTML = currentSet
    document.getElementById('Points').value = points
    document.getElementById('Sets').value = sets
    document.getElementById('taiBreak').value = taiBreak
    if (homeName == undefined) {}
    else {
       document.getElementById('homeName').value = homeName 
    }
    if (visitorName == undefined) {}
    else {
       document.getElementById('visitorName').value = visitorName  
    }
    renderSetsResults()
}
function disableButtons(status){
    let addHome = document.getElementById("TeamAAdd")
    let removeHome = document.getElementById('TeamARemove')
    let addVisitor = document.getElementById('TeamBAdd')
    let removeVisitor = document.getElementById('TeamBRemove')
    addHome.disabled = status
    removeHome.disabled = status
    addVisitor.disabled = status
    removeVisitor.disabled = status
}

function checkVictory() {
    if (
        homeScore > visitorScore + 1 && 
        homeScore >= points &&
        homeSet < (sets/2) - 1 &&
        currentSet <= sets - 1
        ) {
        homeScore = 0
        visitorScore = 0
        homeSet++
        currentSet++
        createNewNotify(homeName+" Winner this Set!",1500,'success')
        checkNumbersAndRenderize()
        updateDB()
    }
    else if (
        homeScore > visitorScore + 1 && 
        homeScore >= points &&
        homeSet > (sets/2) - 1 &&
        homeSet > visitorSet &&
        currentSet <= sets - 1
    ){
        homeSet++
        createNewNotify(homeName+" Winner this Game!",1500,'success')
        checkNumbersAndRenderize()
        updateDB()
        disableButtons(true)
    }
    else if (
        visitorScore > homeScore + 1 &&
        visitorScore >= points &&
        visitorSet < (sets/2) - 1 &&
        currentSet <= sets - 1
         ) {
        homeScore = 0
        visitorScore = 0
        visitorSet++
        currentSet++
        createNewNotify(visitorName+" Winner this Set!",1500,'success')
        checkNumbersAndRenderize()
        updateDB()
    }
    else if (
        visitorScore > homeScore + 1 &&
        visitorScore >= points &&
        visitorSet > (sets/2) - 1 &&
        visitorSet > homeSet &&
        currentSet <= sets - 1
    ) {
        visitorSet++
        createNewNotify(visitorName+" Winner this Game!",1500,'success')
        checkNumbersAndRenderize()
        updateDB()
        disableButtons(true)
    }
    //tai-break
    else if (
        homeScore > visitorScore + 1 && 
        homeScore >= taiBreak &&
        homeSet > (sets/2) - 1 &&
        currentSet == sets
    ) {
        homeSet++
        createNewNotify(homeName+" Winner this Game!",1500,'success')
        checkNumbersAndRenderize()
        updateDB()
        disableButtons(true)
    }
    else if (
        visitorScore > homeScore + 1 && 
        visitorScore >= taiBreak &&
        visitorSet > (sets/2) - 1 &&
        currentSet == sets
    ){
        visitorSet++
        createNewNotify(visitorName+" Winner this Game!",1500,'success')
        checkNumbersAndRenderize()
        updateDB()
        disableButtons(true)
    }
}

function buttonClicked(button){
    switch (button) {
        case 'TeamAAdd':
            homeScore++
            break;
        case 'TeamARemove':
            homeScore--
            break;
        case 'TeamBAdd':
            visitorScore++
            break;
        case 'TeamBRemove':
            visitorScore--
            break;
        default:
            break;
    }
    checkNumbersAndRenderize()
    updateDB()
    checkVictory()
}
function showSetsResults(){
    switch (currentSet) {
        case 1:
            set1 = homeScore+" - "+visitorScore
            break;
        case 2:
            set2 = homeScore+" - "+visitorScore
            break;
        case 3:
            set3 = homeScore+" - "+visitorScore
            break;
        case 4:
            set4 = homeScore+" - "+visitorScore
            break;
        case 5:
            set5 = homeScore+" - "+visitorScore
            break;
        default:
            break;
    }
    switch (sets) {
        case 1:
            document.getElementById('set1').innerHTML = set1 || ''
            break;
        case 3:
            document.getElementById('set1').innerHTML = set1 || ''
            document.getElementById('set2').innerHTML = set2 || ''
            document.getElementById('set3').innerHTML = set3 || ''
            break;
        case 5:
            document.getElementById('set1').innerHTML = set1 || ''
            document.getElementById('set2').innerHTML = set2 || ''
            document.getElementById('set3').innerHTML = set3 || ''
            document.getElementById('set4').innerHTML = set4 || ''
            document.getElementById('set5').innerHTML = set5 || ''
            break;
        default:
            break;
    }
}
function reset(){
    homeScore = 0
    visitorScore = 0
    homeSet = 0
    visitorSet = 0
    currentSet = 1
    points = 25
    taiBreak = 15
    sets = 3
    homeName = ''
    visitorName = ''
    set1 = ''
    set2 = ''
    set3 = ''
    set4 = ''
    set5 = ''
    buttonClicked()
    disableButtons(false)
}
function changePointsOrSetsValues(reloadPage){
    loadDOMValues()
    checkNumbersAndRenderize()
    updateDB()
    if (reloadPage) {
        window.location.reload()
    }
}
function removeSetsDiv(){
    var setsDiv = document.getElementById('setsDiv')
    setsDiv.remove()
}
