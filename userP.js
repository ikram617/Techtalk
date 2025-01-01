// log out button 

var logout = document.querySelector('.logout')
logout.addEventListener('click',()=>{
    window.location.href='./wlcmP.html'
})

// add account button 
var addacc = document.querySelector('.addaccount')
addacc.addEventListener('click',()=>{
    window.location.href='./wlcmP.html#logSign'
})


// back to page principale 

var backB=document.querySelector('.menu i')
backB.addEventListener('click',()=>{
    window.location.href='./PageP.php'
})


// reset password 
var password = document.querySelector('.reset')
var passwordDiv = document.querySelector('.resetBlock')
password.addEventListener('click',()=>{
   passwordDiv.classList.remove('innactive')
   passwordDiv.classList.add('active')
})

// back and validate buttons 
var backpassword = document.querySelector('.backpsw')
var validatepassword=document.querySelector('.validate')
backpassword.addEventListener('click',()=>{
    passwordDiv.classList.remove('active')
   passwordDiv.classList.add('innactive')
})

validatepassword.addEventListener('click',()=>{

    passwordDiv.classList.remove('active')
   passwordDiv.classList.add('innactive')
})

// archieve page 
var archive = document.querySelector('.archive')
archive.addEventListener('click',()=>{
    window.location.href='./archive.html'
})