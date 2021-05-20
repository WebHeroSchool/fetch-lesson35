const body = document.body;
let url = window.location.toString();
let urlFetch = getUserName(url);

function getUserName(url) {
  let allUrl = url.split('=');
  let name = allUrl[1];
  if (!name) {
    name = 'defunkt';
  }

  return 'https://api.github.com/users/' + name;
}

fetch(urlFetch)
  .then(res => res.json())
  .then(json => {
    if (json.message !== 'Not Found') {
      let img = document.createElement('img');
      img.src = json.avatar_url;
      body.append(img);

      let name = document.createElement('a');
      name.textContent = json.name;
      name.href = json.html_url;
      body.prepend(name);

      let bio = document.createElement('div');
      bio.textContent = json.bio;
      body.append(bio);
    } else {
      let error = document.createElement('p');
      error.textContent = 'Информация о пользователе не доступна';
      body.append(error);
    }
  })
