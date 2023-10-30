// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod

import { user } from "./index.js";

const personalKey = "khusnullina-lyubov";
//const personalKey = "prod";
const baseHost = "https://wedev-api.sky.pro";
//const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export const getToken = () => {
  const token = user ? `Bearer ${user.token}` : undefined;
  return token;
};


export function getPosts() {
  const token = getToken();
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function addPost({ description, imageUrl }) {
  const token = getToken();
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description: description,
      imageUrl,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        alert("Добавь фото или описание");
        throw new Error("Выберите фото и добавьте комментарий");
      }
      return response.json();
    });
}

export function getUserPost(id) {
  const token = getToken();
  return fetch(postsHost + `/user-posts` + `/${id}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

export function addLike(id) {
  const token = getToken();
  return fetch(postsHost + `/${id}`+ `/like`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    // mode: "no-cors",
  })
  .then((response) => {
    if (response.status !== 200) {
      throw new Error("Нет авторизации для того, чтобы лайкать посты");
    }
    return response.json();
  })
  .catch((error) => {
    if ((error.message = "Нет авторизации для того, чтобы лайкать посты")) {
      alert("Авторизуйтесь, чтобы поставить лайк");
    }
  })
  .then((data) => {
    return data.post;
  });
}

export function disLike(id) {
  const token = getToken();
  return fetch(postsHost + `/${id}`+ `/dislike`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    // mode: "no-cors", 
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  })
  .then((data) => {
    return data.post;
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}
