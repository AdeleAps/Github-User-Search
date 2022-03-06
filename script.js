// saves light/dark mode preference

document.addEventListener("DOMContentLoaded", function(event) {
  let background = window.localStorage.getItem("background");
  if(background) {
    document.body.className += background;
  }
});

// light and dark mode

function toggleMode(event, mode) {
    let i, textchange;
    textchange = document.getElementsByClassName("toggle");
    for (i = 0; i < textchange.length; i++) {
        textchange[i].style.display = "none";
      }
    document.getElementById(mode).style.display = "inline";
    document.body.classList.toggle("dark-theme");
    
    if (document.body.classList.contains("dark-theme")) {
    window.localStorage.setItem("background", "dark-theme");
      } else {
        localStorage.setItem("background", "");
    }
}
// GitHub API

const gitHubForm = document.getElementById('gitHubForm');

gitHubForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let usernameInput = document.getElementById('usernameInput');
  let gitHubUsername = usernameInput.value;
  requestUser(gitHubUsername);
  document.getElementById("profile-pic").innerHTML = "";
  let input = document.querySelectorAll(".input");
  for (i = 0; i < input.length; i++) {
    input[i].textContent = "";
  document.getElementById("content").style.display = "block";
  }}
)


function infoError(name) {
  name.textContent = "Not Available";
  name.parentElement.style.opacity = "0.5";
}

function infoSuccess(name) {
  name.parentElement.style.opacity = "1";
}

// display API data

function requestUser(username){
  const xhr = new XMLHttpRequest();
  const url = `https://api.github.com/users/${username}`;
  xhr.open('GET', url, true);

  xhr.onerror = function() {
  alert("Invalid value");
  }

  xhr.onload = function() {
  const data = JSON.parse(this.response);
  if ("login" in data) {
  let username = document.getElementById('username');

  if (!data.name) {
    username.textContent = data.login;
  } else {
    username.textContent = data.name;
  }

  let twitter = document.getElementById('twitter');
  if (!data.twitter_username) {
    twitter.style.display = "none";
  } else {
    twitter.style.display = "block";
    twitter.textContent = '@' + data.twitter_username;
  }

  let joined = document.getElementById('joined');
  let monthIndex = (parseInt(data.created_at.substr(5, 2), 10) - 1);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[monthIndex];
  joined.textContent = 'Joined ' + data.created_at.substr(8, 2) + " " + month + " " + data.created_at.substr(0, 4);

  let description = document.getElementById('description');
  description.textContent = data.bio;

  let profilePic = document.getElementById('profile-pic');
  let img = document.createElement('img');
  img.src = data.avatar_url;
  profilePic.append(img);    

  let repos = document.getElementById('repos');
  repos.textContent = data.public_repos;

  let followers = document.getElementById('followers');
  followers.textContent = data.followers;

  let following = document.getElementById('following');
  following.textContent = data.following;
  
  let location = document.getElementById('location');
  if (!data.location) {
  infoError(location);
  } else {
  location.textContent = data.location;
  infoSuccess(location);
}

  let twitterInfo = document.getElementById('twitter-info');
  if (!data.twitter_username) {
    infoError(twitterInfo);
  } else {
    twitterInfo.textContent = data.twitter_username;
    infoSuccess(twitterInfo);
}

  let website = document.getElementById('website');
  if (!data.blog) {
    infoError(website);
  } else {
    website.textContent = data.blog;
    infoSuccess(website);
}

  let company = document.getElementById('company');
  if (!data.company) {
    infoError(company);
  } else {
    company.textContent = data.company;
    infoSuccess(company);
  }
}
else {
  document.getElementById("usernameInput").value = "";
  document.getElementById("usernameInput").setAttribute("placeholder", "Invalid Username!");
  document.getElementById("content").style.display = "none";
} 
}
xhr.send();
}



// page refresh when clicking the title

function refreshPage() {
  window.location.reload();
  document.getElementById("usernameInput").value = "";
}









