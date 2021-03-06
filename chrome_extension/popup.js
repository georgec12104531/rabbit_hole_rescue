// Signup button opens Web application's signup page in new tab

let loggedIn, recording;

if (window.localStorage.getItem("loggedIn") != null) {
  loggedIn = window.localStorage.getItem("loggedIn"); 
}
else {
  loggedIn = "false";
  window.localStorage.setItem("loggedIn", "false");
}

if (window.localStorage.getItem("recording") != null) {
    recording = window.localStorage.getItem("recording");
}
else {
    recording = "false";
    window.localStorage.setItem("recording", "false");
}

let navlogo = document.getElementById("nav-logo");
let signup = document.getElementById("signup");
let usernameField = document.getElementById("username");
let passwordField = document.getElementById("password");
let login = document.getElementById('login');
let start = document.getElementById('start');
let stop = document.getElementById('stop');
let visualization = document.getElementById("visualization");
let logout = document.getElementById('logout');
let errors = document.getElementById('errors');

document.addEventListener("DOMContentLoaded", function() {
    navlogo.addEventListener("click", function() {
        window.open("https://rabbit-hole-rescue.herokuapp.com");
    });
});

document.addEventListener("DOMContentLoaded", function() {
  let xhr = new XMLHttpRequest();

  signup.addEventListener("click", function() {
    window.open("https://rabbit-hole-rescue.herokuapp.com/#/signup", "_blank");
  });
});

document.addEventListener("DOMContentLoaded", function () {
    usernameField.addEventListener("click", function () {
        if (!errors.classList.contains('hidden')) {
            errors.classList.add('hidden');
        }    
    });
});

document.addEventListener("DOMContentLoaded", function () {
    passwordField.addEventListener("click", function () {
        if (!errors.classList.contains('hidden')) {
            errors.classList.add('hidden');
        }    
    });
});

if (loggedIn === "true") {
    if (!login.classList.contains('disabled')) {
        login.classList.add('disabled');
    }
    if (!errors.classList.contains('hidden')) {
        errors.classList.add('hidden');
    }
}

if ( loggedIn === "true" && recording === "false" ) {
    if (start.classList.contains('disabled')){
        start.classList.remove('disabled');
    }
    if (visualization.classList.contains('disabled')) {
        visualization.classList.remove('disabled');
    }
    if (logout.classList.contains('disabled')) {
        logout.classList.remove('disabled');
    }
}

if ( loggedIn === "true" && recording === "true") {
    if (stop.classList.contains('disabled')) {
        stop.classList.remove('disabled');
    }
    if (logout.classList.contains('disabled')) {
        logout.classList.remove('disabled');
    }
}

if (loggedIn === "false" && !errors.classList.contains('hidden')) {
    errors.classList.add('hidden');
}

// Login button sends username to background.js on success 

document.addEventListener('DOMContentLoaded', function () {
    let xhr = new XMLHttpRequest();
    login.addEventListener('click', function () {
        if (loggedIn === "false") {
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            xhr.open("POST", "https://rabbit-hole-rescue.herokuapp.com/api/users/login/", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            let str = `username=${username}&password=${password}`;
            
            xhr.send(str);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    chrome.runtime.sendMessage({sender: "login", username: username});
                    if (start.classList.contains('disabled')) {
                        start.classList.remove('disabled');
                    }
                    if (visualization.classList.contains('disabled')) {
                        visualization.classList.remove('disabled');
                    }
                    if (logout.classList.contains('disabled')) {
                        logout.classList.remove('disabled');
                    }
                    loggedIn = "true";
                    window.localStorage.setItem("loggedIn", "true");
                    if (!login.classList.contains('disabled')) {
                        login.classList.add('disabled');
                    }
                    if (!errors.classList.contains('hidden')) {
                        errors.classList.add('hidden');
                    }
                }
                else {
                  if (errors.classList.contains('hidden')) {
                      errors.classList.remove('hidden');
                  }
                }
            };
        }

        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    });
});

// Start button sends message to background.js to start recording session 

document.addEventListener('DOMContentLoaded', function () {

    start.addEventListener('click', function() {
        if (loggedIn === "true" && recording === "false") {
            chrome.runtime.sendMessage({sender: "start"});
            if (stop.classList.contains('disabled')) {
                stop.classList.remove('disabled');
            }
            if ( !start.classList.contains('disabled')) {
                start.classList.add('disabled');
            }
            recording = "true";
            window.localStorage.setItem("recording", "true");
        }
    });
});

// Stop button reloads extension, stopping recording and clearing username 

document.addEventListener('DOMContentLoaded', function () {
    stop.addEventListener('click', function () {
      if (loggedIn === "true" && recording === "true") {
        recording = false;
        loggedIn = false;
        window.localStorage.setItem("recording", "false");
        window.localStorage.setItem("loggedIn", "false");
        chrome.runtime.sendMessage({sender: "stop"});
      }
    });
});

// Visualization button opens visualization page in new tab 

document.addEventListener("DOMContentLoaded", function() {
  visualization.addEventListener("click", function() {
    if (loggedIn === "true") {
        window.open("https://rabbit-hole-rescue.herokuapp.com/history", "_blank");
    }
  });
});

// Logout button resets localStorage loggedIn to false and stops recording

document.addEventListener("DOMContentLoaded", function() {
  let xhr = new XMLHttpRequest();

  logout.addEventListener("click", function() {
      if (loggedIn === "true") {

          window.localStorage.setItem("loggedIn", "false");
          if (recording === "true") {
            window.localStorage.setItem("recording", "false");
          }
          chrome.runtime.sendMessage({sender: "stop"});
      }
  });
});


