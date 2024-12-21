// Part One 
var login = document.getElementById('log-in-btn')
var signin = document.getElementById('sign-in-btn')
var SignButton = document.querySelector('.SButton')
var joinnowB = document.querySelector('.joinnowB')
var joinnowI = document.querySelector('.joinnow i')


SignButton.addEventListener('click',()=>{
  SmoothScroll('.logSign',2000)
})

joinnowB.addEventListener('click',()=>{
  SmoothScroll('.logSign',2000)
})


joinnowI.addEventListener('click',()=>{
  SmoothScroll('.logSign',2000)
})

login.addEventListener('click',()=>{
  document.getElementById('sign-in-form').classList.remove('active')
  document.getElementById('sign-in-form').classList.add('innactive')
  document.getElementById('log-in-form').classList.remove('innactive')
  document.getElementById('log-in-form').classList.add('active')
  document.getElementById('sign-in-btn').classList.remove('activeLine')
  document.getElementById('sign-in-btn').style.borderBottom='none'
  document.getElementById('log-in-btn').style.borderBottom='2px solid white'
  document.getElementById('log-in-btn').classList.add('activeLine')
  FullName.value=''
  Username.value=''
  emailSign.value=''
  passwordSign.value=''
})
document.getElementById('log-in-btn').style.borderBottom='none'

signin.addEventListener('click',()=>{
  document.getElementById('log-in-form').classList.remove('active')
  document.getElementById('log-in-form').classList.add('innactive')
  document.getElementById('sign-in-form').classList.remove('innactive')
  document.getElementById('sign-in-form').classList.add('active')
  document.getElementById('log-in-btn').classList.remove('activeLine')
  document.getElementById('log-in-btn').style.borderBottom='none'
  document.getElementById('sign-in-btn').style.borderBottom='2px solid white'
  document.getElementById('sign-in-btn').classList.add('activeLine')
  
})





function SmoothScroll(Target,duree){
  var target = document.querySelector(Target)
  var targetPos = target.getBoundingClientRect().top
  var startPos = window.scrollY
  distance = targetPos-startPos
  var startTime = null 


function AnimationScroll (currentT){
  if(startTime=== null){
      startTime=currentT 
  }
 var  time = currentT - startTime 
  var run = ease(time , startPos,distance,duree)
  window.scrollTo(0,run)
  if(time < duree)  requestAnimationFrame(AnimationScroll)
}


function ease (t , b , c , d){
    t/= d/2 
    if(t < 1 ) return c/2*t*t +b 
    t--
    return -c/2 * (t*(t-2) - 1 ) + b
}

requestAnimationFrame(AnimationScroll)
}

// 3eme Partie (Log in part )




var SignFormButton = document.querySelector('input[value="Sign In"]')
var LogFormButton = document.querySelector('input[value="Log In"]')
var FullName = document.querySelector('input[placeholder="Full Name"]')
  var Username = document.querySelector('input[placeholder="Username"]')
  var emailSign = document.querySelector('.emailSign')
  var passwordSign = document.querySelector('.passwordSign')
  var emailLog = document.querySelector('.emailLog')
  var passwordLog = document.querySelector('.passwordLog')


  
// Welcome Dialog 
const dialog = document.getElementById("myDialog")
const closeButton = document.querySelector(".close-btnDialog")
let  DialogTitre = document.querySelector('#myDialog h3')
let DialogContext = document.querySelector('#myDialog p')
SignFormButton.addEventListener('click',()=>{
  if(verifier(FullName,Username,emailSign,passwordSign)===1){
    DialogTitre.textContent='Welcome to TechTalk!'
    DialogContext.textContent='Bravo ! your Sign in was made Successfully'
    dialog.showModal()
    FullName.value=''
    Username.value=''
    emailSign.value=''
    passwordSign.value=''
    window.location.href=''   // send user to page pricipale
  }
})


// log in 
LogFormButton.addEventListener('click',()=>{
  // verifier que ce user exist et mot passe correct par la base de donne si oui
  emailLog.value=''
  passwordLog.value=''
   window.location.href=''
})

closeButton.addEventListener("click", () => {
  dialog.close(); 
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

function FormEmail(email){
  return email.endsWith("@gmail.com")
}

function verifier(FullName,Username,email,password){
  

  if(FullName.value.length<6 || FullName.value===null){
    DialogTitre.textContent='Warning !'
    DialogContext.textContent='your Full name is less than 6 caracteres  '
    dialog.showModal()
    document.querySelector('.inputFullname').style.boxShadow='0 0 8px red'
    return 0
  }
  else {
    document.querySelector('.inputFullname').style.boxShadow="none" 
  
  }
  if(Username.value.length < 8 || Username.value===null){
    DialogTitre.textContent='Warning  !'
    DialogContext.textContent='your user name is short'
    dialog.showModal()

    document.querySelector('.inputUsername').style.boxShadow='0 0 5px red'
    return 0

  }
  else {
    document.querySelector('.inputUsername').style.boxShadow="none"
  }
  if(! FormEmail(email.value) || email.value===null){
    // check que ce user name n'est exist pas deja dans la base de donnee
     DialogTitre.textContent='Warning  !'
    DialogContext.textContent='please check your email again '
    document.querySelector('.inputEmail').style.boxShadow='0 0 5px red'
    return 0
  }
  else {
    document.querySelector('.inputEmail').style.boxShadow="none"
  }

  if(password.value < 8 || password.value ===null ){
     DialogTitre.textContent='Warning  !'
    DialogContext.textContent='your password should be longer than 8 caracteres '
    document.querySelector('.inputPassword').style.boxShadow='0 0 5px red'
    return 0
  }
  else {
    document.querySelector('.inputPassword').style.boxShadow="none"
  }
  return 1 
}

