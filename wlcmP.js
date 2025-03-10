// Part One 
var login = document.getElementById('log-in-btn');
var signin = document.getElementById('sign-in-btn');
var SignButton = document.querySelector('.SButton');
var joinnowB = document.querySelector('.joinnowB');
var joinnowI = document.querySelector('.joinnow i');

SignButton.addEventListener('click', () => {
  SmoothScroll('.logSign', 2000);
});

joinnowB.addEventListener('click', () => {
  SmoothScroll('.logSign', 2000);
});

joinnowI.addEventListener('click', () => {
  SmoothScroll('.logSign', 2000);
});

login.addEventListener('click', () => {
  document.getElementById('sign-in-form').classList.remove('active');
  document.getElementById('sign-in-form').classList.add('innactive');
  document.getElementById('log-in-form').classList.remove('innactive');
  document.getElementById('log-in-form').classList.add('active');
  document.getElementById('sign-in-btn').classList.remove('activeLine');
  document.getElementById('sign-in-btn').style.borderBottom = 'none';
  document.getElementById('log-in-btn').style.borderBottom = '2px solid white';
  document.getElementById('log-in-btn').classList.add('activeLine');
  FullName.value = '';
  Username.value = '';
  emailSign.value = '';
  passwordSign.value = '';
});
document.getElementById('log-in-btn').style.borderBottom = 'none';

signin.addEventListener('click', () => {
  document.getElementById('log-in-form').classList.remove('active');
  document.getElementById('log-in-form').classList.add('innactive');
  document.getElementById('sign-in-form').classList.remove('innactive');
  document.getElementById('sign-in-form').classList.add('active');
  document.getElementById('log-in-btn').classList.remove('activeLine');
  document.getElementById('log-in-btn').style.borderBottom = 'none';
  document.getElementById('sign-in-btn').style.borderBottom = '2px solid white';
  document.getElementById('sign-in-btn').classList.add('activeLine');
});

function SmoothScroll(Target, duree) {
  var target = document.querySelector(Target);
  var targetPos = target.getBoundingClientRect().top;
  var startPos = window.scrollY;
  distance = targetPos - startPos;
  var startTime = null;

  function AnimationScroll(currentT) {
    if (startTime === null) {
      startTime = currentT;
    }
    var time = currentT - startTime;
    var run = ease(time, startPos, distance, duree);
    window.scrollTo(0, run);
    if (time < duree) requestAnimationFrame(AnimationScroll);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(AnimationScroll);
}

// Log in part

var SignFormButton = document.querySelector('input[value="Sign In"]');
var LogFormButton = document.querySelector('input[value="Log In"]');
var FullName = document.querySelector('input[placeholder="Full Name"]');
var Username = document.querySelector('input[placeholder="Username"]');
var emailSign = document.querySelector('.emailSign');
var passwordSign = document.querySelector('.passwordSign');
var fieldSelected = document.querySelector('.form-group select');
var emailLog = document.querySelector('.emailLog');
var passwordLog = document.querySelector('.passwordLog');

// Welcome Dialog
const dialog = document.getElementById("myDialog");
const closeButton = document.querySelector(".close-btnDialog");
let DialogTitre = document.querySelector('#myDialog h3');
let DialogContext = document.querySelector('#myDialog p');

SignFormButton.addEventListener('click', () => {
  if (verifierSign(FullName, Username, emailSign, passwordSign, fieldSelected) === 1) {
    DialogTitre.textContent = 'Welcome to TechTalk!';
    DialogContext.textContent = 'Bravo! Your sign-in was successful.';
    dialog.showModal();
    FullName.value = '';
    Username.value = '';
    emailSign.value = '';
    passwordSign.value = '';
     window.location.href = '/PageP.html';
  }
});

// Log in
LogFormButton.addEventListener('click', () => {
  if (verifierLog(emailLog, passwordLog) === 1) {
    emailLog.value = '';
    passwordLog.value = '';
    window.location.href ="/PageP.html"; 
  }
});

function FormEmail(email) {
  return email.endsWith("@gmail.com");
}

function verifierSign(FullName, Username, email, password, field) {
  if (FullName.value === '' && Username.value === '' && email.value === '' && password.value === '' && field.value === "false") {
    DialogTitre.textContent = 'Warning!';
    DialogContext.textContent = 'Please fill in the form.';
    dialog.showModal();
    document.querySelector('.inputFullname').style.boxShadow = '0 0 8px red';
    document.querySelector('.inputUsername').style.boxShadow = '0 0 5px red';
    document.querySelector('.inputEmail').style.boxShadow = '0 0 5px red';
    document.querySelector('.inputPassword').style.boxShadow = '0 0 5px red';
    return 0;
  } else if (isUsernameTaken(Username.value)) {
    document.querySelector('.usernameError').style.display = 'block';
    return 0;
  } else {
    document.querySelector('.usernameError').style.display = 'none';
    // Other validation checks...
    return 1;
  }
}

function isUsernameTaken(username) {
  // This is a placeholder function. You should replace this with the actual check.
  var takenUsernames = ["user1", "user2", "user3"]; // Example array of taken usernames
  return takenUsernames.includes(username);
}

function verifierLog(email, password) {
  if (email.value === '' && password.value === '') {
    DialogTitre.textContent = 'Warning!';
    DialogContext.textContent = 'Please fill in the form.';
    dialog.showModal();
    document.querySelector('.emailLog').style.boxShadow = '0 0 8px red';
    document.querySelector('.passwordLog').style.boxShadow = '0 0 5px red';
    return 0;
  } else {
    document.querySelector('.emailLog').style.boxShadow = 'none';
    document.querySelector('.passwordLog').style.boxShadow = 'none';
    // Additional validation if needed...
    return 1;
  }
}
