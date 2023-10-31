import { addPost, getPosts, getUserPost } from './api.js';
import { renderAddPostPageComponent } from './components/add-post-page-component.js';
import { renderAuthPageComponent } from './components/auth-page-component.js';
import {
  ADD_POSTS_PAGE,
  AUTH_PAGE,
  LOADING_PAGE,
  POSTS_PAGE,
  USER_POSTS_PAGE,
} from './routes.js';
import { renderPostsPageComponent } from './components/posts-page-component.js';
import { renderLoadingPageComponent } from './components/loading-page-component.js';
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from './helpers.js';

export let user = getUserFromLocalStorage();
export let page = null;
export let posts = [];
export const setPosts = (newPosts) => {
  posts = newPosts;
};
export const appEl = document.getElementById('app');

export const logout = () => {
  user = null;
  removeUserFromLocalStorage();
  goToPage(POSTS_PAGE);
};

export const goToPage = (newPage, data) => {
  if (
    [
      POSTS_PAGE,
      AUTH_PAGE,
      ADD_POSTS_PAGE,
      USER_POSTS_PAGE,
      LOADING_PAGE,
    ].includes(newPage)
  ) {
    if (newPage === ADD_POSTS_PAGE) {
      page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
      return renderApp();
    }

    if (newPage === POSTS_PAGE) {
      page = LOADING_PAGE;
      renderApp();

      return getPosts()
        .then((newPosts) => {
          page = POSTS_PAGE;
          posts = newPosts;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
    }

    if (newPage === USER_POSTS_PAGE) {
      console.log('Открываю страницу пользователя: ', data.userId);
      page = LOADING_PAGE;
      renderApp();
      return getUserPost(data.userId)
        .then((res) => {
          setPosts(res);
          page = USER_POSTS_PAGE;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(USER_POSTS_PAGE);
        });
    }

    page = newPage;
    renderApp();

    return;
  }

  throw new Error('страницы не существует');
};

const renderApp = () => {
  if (page === LOADING_PAGE) {
    return renderLoadingPageComponent({
      appEl,
      user,
      goToPage,
    });
  }

  if (page === AUTH_PAGE) {
    return renderAuthPageComponent({
      appEl,
      setUser: (newUser) => {
        user = newUser;
        saveUserToLocalStorage(user);
        goToPage(POSTS_PAGE);
      },
      user,
      goToPage,
    });
  }

  if (page === ADD_POSTS_PAGE) {
    return renderAddPostPageComponent({
      appEl,
      onAddPostClick({ description, imageUrl }) {
        addPost({ description, imageUrl });
        console.log('Добавляю пост...', { description, imageUrl });
        goToPage(POSTS_PAGE);
      },
    });
  }

  if (page === POSTS_PAGE) {
    return renderPostsPageComponent({
      appEl,
    });
  }

  if (page === USER_POSTS_PAGE) {
    return renderPostsPageComponent({
      appEl,
    });
  }
};

goToPage(POSTS_PAGE);
