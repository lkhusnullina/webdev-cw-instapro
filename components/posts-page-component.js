import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { USER_POSTS_PAGE } from '../routes.js';
import { renderHeaderComponent } from './header-component.js';
import { posts, appEl, goToPage, setPosts } from '../index.js';
import { addLike, disLike, getToken } from '../api.js';

export function renderPostsPageComponent({ appEl }) {
  console.log('Актуальный список постов:', posts);
  const postsHtml = posts
    .map((post) => {
      return `<li class="post" data-post-id=${post.id}>
              <div class="post-header" data-user-id=${post.user.id}>
                  <img src="${
                    post.user.imageUrl
                  }" class="post-header__user-image">
                  <p class="post-header__user-name">${post.user.name}</p>
              </div>
              <div class="post-image-container">
                <img class="post-image" src="${post.imageUrl}">
              </div>
              <div class="post-likes">
                <button data-post-id=${post.id} data-like=${
                  post.isLiked
                } class="like-button">
                    <img  src="${
                      post.isLiked
                        ? './assets/images/like-active.svg'
                        : './assets/images/like-not-active.svg'
                    }">
                </button>
                <p class="post-likes-text">
                    Нравится: <strong>${post.likes.length}</strong>
                </p>
              </div>
              <p class="post-text">
                <span class="user-name">${post.user.name}</span>
                ${post.description}
              </p>
              <p class="post-date">
                  ${formatDistanceToNow(new Date(post.createdAt), {
                    locale: ru,
                    includeSeconds: true,
                  })}
                назад</p>
          </li>`;
    })
    .join('');

  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${postsHtml}
      </ul>
    </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector('.header-container'),
  });

  for (let userEl of document.querySelectorAll('.post-header')) {
    userEl.addEventListener('click', () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  init();
}

const init = () => {
  let likeButtons = document.querySelectorAll('.like-button');
  for (let likeButton of likeButtons) {
    likeButton.addEventListener('click', addLikesElements);
  }
};

const addLikesElements = (event) => {
  event.stopPropagation();

  if (!getToken()) {
    alert('Необходимо авторизоваться');
    return;
  }

  const postBlock = event.target.closest('.post');
  const postId = postBlock.dataset.postId;
  let post = posts.find((p) => p.id == postId);
  if (!post) return;
  if (post.isLiked) {
    disLike(postId).then((response) => {
      const newItems = posts.map((post) => {
        if (post.id == postId) {
          return response;
        } else {
          return post;
        }
      });
      setPosts(newItems);
      renderPostsPageComponent({ appEl });
    });
  } else {
    addLike(postId).then((response) => {
      const newItems = posts.map((post) => {
        if (post.id == postId) {
          return response;
        } else {
          return post;
        }
      });
      setPosts(newItems);
      renderPostsPageComponent({ appEl });
    });
  }
};
