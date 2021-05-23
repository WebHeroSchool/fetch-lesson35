const body = document.body;
let nowUrl = window.location.toString();
let url = getUserName(nowUrl);
let nowDate = new Date();

function getUserName(url) {
  let allUrl = url.split('=');
  let name = allUrl[1];
  if (!name) {
    name = 'defunkt';
  }

  return 'https://api.github.com/users/' + name;
}

const getDate = new Promise((resolve, reject) => {
  setTimeout(() => nowDate ? resolve(nowDate) : reject('Проблемы с получением даты'), 2000);
});
const getUrl = new Promise((resolve,reject) => {
  setTimeout(() => url ? resolve(url) : reject('Проблемы с получением url'), 3000);
});

Promise.all([getDate, getUrl])
  .then(([date, url]) => {
    let htmlDate = document.createElement('p');
    htmlDate.textContent = date;
    body.append(htmlDate);
    
    return fetch(url);
  })
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

      let preloader = document.getElementById('preloader');
      json.onload = preloader.classList.add('hidden');
    } else {
      let error = document.createElement('p');
      error.textContent = 'Информация о пользователе не доступна';
      body.append(error);
    }
  })
  .catch(err => console.log(err));
