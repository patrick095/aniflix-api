// var alertMsg = document.querySelector('.alert')
var notify = document.createElement('div')
var typeNotification = ''
function createNotifyHtml(msg,time,type){
    var body = document.querySelector('body')
    var subAlert = document.createElement('div')
    var notifySpan = document.createElement('span')
    var notifyMsg = document.createTextNode(msg)
    var progressBar = document.createElement('progress')
    progressBar.setAttribute('max', time/10)
    progressBar.setAttribute('value','0')
    notify.setAttribute('class',type)
    subAlert.setAttribute('class','sub'+type)
    notifySpan.appendChild(notifyMsg)
    subAlert.appendChild(notifySpan)
    notify.appendChild(progressBar)
    notify.appendChild(subAlert)
    body.appendChild(notify)
}
function deleteNotifyHtml(){
    var notify = document.querySelector('body .'+typeNotification)
    var subNotify = document.querySelector('body .sub'+typeNotification)
    var progressBar = document.querySelector('body progress')
    notify.remove()
    subNotify.remove()
    progressBar.remove()
}

function progressBar(){
    var progress = document.querySelector('progress'),
    MAXIMUM   = progress.max;
    var interval = setInterval(function(){
        progress.value+= 1;
        if(progress.value >= MAXIMUM){
            clearInterval(interval);
        }
    }, 10);
}

function toggleClass(x){
        notify.classList.toggle('hide')
        if (x == null) {
            notify.style.marginTop = "-5%"
        }
}
function alertNotification(msg){
    setTimeout(function(){
        notify.style.marginTop = "3%"
    }, 100)
    // createNotifyHtml(msg)
    // document.getElementById("alert").innerHTML = msg
    // toggleClass(1)
}
function createNewNotify(msg,time,type){
    typeNotification = type
    alertNotification()
    createNotifyHtml(msg,time,type)
    toggleClass(1)
    progressBar(time)
    setTimeout(toggleClass,time)
    setTimeout(deleteNotifyHtml,time+200)
}
