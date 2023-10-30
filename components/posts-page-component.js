import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, page, setPosts } from "../index.js";
import { addLike, disLike, getToken } from "../api.js";

export function renderPostsPageComponent({ appEl }) {
  
  // TODO: реализовать рендер постов из api
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  
  console.log("Актуальный список постов:", posts);
  const postsHtml = posts.map((post) => {
    return `<li class="post" data-post-id=${post.id}>
              <div class="post-header" data-user-id=${post.user.id}>
                  <img src="${post.user.imageUrl}" class="post-header__user-image">
                  <p class="post-header__user-name">${post.user.name}</p>
              </div>
              <div class="post-image-container">
                <img class="post-image" src="${post.imageUrl}">
              </div>
              <div class="post-likes">
                <button data-post-id=${post.id} data-like=${post.isLiked} class="like-button">
                    <img  src="${post.isLiked ? './assets/images/like-active.svg' : './assets/images/like-not-active.svg'}">
                </button>
                <p class="post-likes-text">
                    Нравится: <strong>${post.likes.length}</strong>
                </p>
              </div>
              <p class="post-text">
                <span class="user-name">${post.user.name}</span>
                ${post.description}
              </p>
              <p class="post-date">19 минут назад</p>
          </li>`
  }).join('');
  
  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${postsHtml}
      </ul>
    </div>`;
  
  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
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
    likeButton.addEventListener('click', addLikesElements)
  }
}

const addLikesElements = (event) => {
  event.stopPropagation();

  if (!getToken()) {
    alert('Необходимо авторизоваться')
    return;
  }

  const postBlock = event.target.closest('.post');
  console.log('postBlock',postBlock);
  const postId = postBlock.dataset.postId;
  console.log('postId',postId);
  let post = posts.find((p) => p.id == postId);
  console.log('post',post);
  if (!post) return;
  if (post.isLiked) {
    disLike(postId).then((response) => {
      setPosts(response);
      goToPage(page);
    });
  } else {
    addLike(postId).then((response) => { 
      setPosts(response);
      goToPage(page);
    });
  }
}

