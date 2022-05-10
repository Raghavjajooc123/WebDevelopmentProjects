const socket= io()
let name;
let textarea = document.querySelector('#messagesender')
let messageArea = document.querySelector('.msgwindow')
let correctpassword = 'raghavchat'

do{
    name = prompt('Please enter your name:')
} while(!name)

do{
    password = prompt('Please enter password provided by Raghav Jajoo:')
} while(password!=correctpassword)

textarea.addEventListener('keyup' , (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg ={
        user: name,
        message: message.trim()
    }

    appendMessage(msg,'outgoing')
    textarea.value=''
    scrolltobottom()
    
    
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')
    let markup =`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// recieveing message
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrolltobottom()
})

function scrolltobottom() {
    messageArea.scrollTop=messageArea.scrollHeight
}