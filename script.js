const body = document.body;


function getUserName() {
  let name = prompt('Введите ник пользователя на GitHub', '');

  if (!name) {
    let div = document.createElement('div');
    body.append(div);
    div.textContent = 'Вы не ввели имя пользователя :(';
  }

  return 'https://api.github.com/users/' + name;
}

let url = getUserName();

fetch(url)
  .then(res => res.json())
  .then(json => {
    if (json.message !== 'Not Found') {
      let img = document.createElement('img');
      img.src = json.avatar_url;
      body.append(img);

      let name = document.createElement('h1');
      name.textContent = json.name;
      body.prepend(name);

      let a = document.createElement('a');
      a.href = url;
      a.textContent = `${json.login} BIO (ссылка)`;
      body.append(a);

      let bio = document.createElement('div');
      bio.textContent = json.bio;
      body.append(bio);
    } else {
      let error = document.createElement('p');
      error.textContent = 'Информация о пользователе не доступна';
      body.append(error);
    }
  })
