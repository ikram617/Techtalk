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