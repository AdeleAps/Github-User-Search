// light and dark mode

function toggleMode(event, mode) {
    let i, textchange;
    textchange = document.getElementsByClassName("toggle");
    for (i = 0; i < textchange.length; i++) {
        textchange[i].style.display = "none";
      }
    document.getElementById(mode).style.display = "inline";
    document.body.classList.toggle("dark-theme");
}

// GitHub API

const gitHubForm = document.getElementById('gitHubForm');

gitHubForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let usernameInput = document.getElementById('usernameInput');
  let gitHubUsername = usernameInput.value;
  requestUser(gitHubUsername);
  document.getElementById("profile-pic").innerHTML = "";
})

// display API data

function requestUser(username){
  const xhr = new XMLHttpRequest();
  const url = `https://api.github.com/users/${username}`;
  xhr.open('GET', url, true);
  xhr.onload = function() {
  const data = JSON.parse(this.response);
  console.log(data);

  let username = document.getElementById('username');
  username.textContent = data.name;

  let twitter = document.getElementById('twitter');
  twitter.textContent = '@' + data.twitter_username;

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
  }
xhr.send();
}









