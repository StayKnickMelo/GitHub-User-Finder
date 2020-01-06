const input = document.querySelector('#user');

const containerDisplay = document.querySelector('.container-display');

class GitHub {
  constructor(clientId, clientSecret) {
    this.clientId = 'd2c484ef9cc52484b013';
    this.clientSecret = '6bb0496e05e9da6f41965314539273a2f46606b4';
  }

  async getUser(user) {
    const response = await fetch(`https://api.github.com/users/${user}?client_id=${this.clientId}&client_secret=${this.clientSecret}`);

    const resDate = await response.json();


    return resDate;
  }
};

const user = new GitHub();

input.addEventListener('input', displayUser);


function displayUser(e) {
  const userToDisplay = e.target.value;

  if (userToDisplay === '') {
    containerDisplay.innerHTML = '';
  } else {
    user.getUser(userToDisplay)
      .then(user => {
        if (user.message === "Not Found") {
          containerDisplay.innerHTML = '';
          showAlert('User Not Found');
        } else {
          containerDisplay.innerHTML = `<div class="content">
        <img src="${user.avatar_url}" alt="" />
        <div class="bio">
          <span>${user.login}</span>
          <span>${user.location}</span>
        </div>
        <div class="bio-inner">
          <span class="text">Public Repos</span>
          <div class="badge orange"><span >${user.public_repos}</span></div>
        </div>
        <div class="bio-inner">
          <span class="text">Public Gists</span>
          <div class="badge orange"><span >${user.public_gists}</span></div>
        </div>
        <div class="bio-inner">
          <span class="text">Followers</span>
          <div class="badge blue"><span >${user.followers}</span></div>
        </div>
        <div class="bio-inner">
          <span class="text">Following</span>
          <div class="badge blue"><span >${user.following}</span></div>
        </div>
        <div class="link">
          <a href="${user.html_url}" target="_blank">Visit Profile</a>
        </div>
      </div>`
        }
      });
  }

}

function showAlert(message) {
  if(document.querySelector('.error')){
    document.querySelector('.error').remove();
  }
  const div = document.createElement('div');

  div.className = 'error';

  div.appendChild(document.createTextNode(message));

  containerDisplay.appendChild(div);
}





