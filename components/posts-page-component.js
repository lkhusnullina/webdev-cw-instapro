import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
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
                    Нравится: <strong>2</strong>
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
  
  init();

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
}

const init = () => {
  let likeButtons = document.querySelectorAll('.like-button');
  for (let likeButton of likeButtons) {
    likeButton.addEventListener('click', addLikesElements)
  }
}

const addLikesElements = (event) => {
  
  if (!getToken()) {
    alert('Необходимо авторизоваться')
    return;
  }

  const postBlock = event.target.closest('.post');
  const postId = postBlock.dataset.postId;
  const post = posts.find((p) => p.id == postId);
  console.log(post);
  if (!post) return;

  if(post.isLiked) {
    disLike(postId);
  } else {
    addLike(postId)
  }
}





// const addLikesElements = (event) => {
//   const postBlock = event.target.closest('.post');
//   console.log(postBlock);
//   const postId = postBlock.dataset.id;
//   console.log(postId);
//   const likes = postBlock.querySelector('.like-button');
//   // const posts = getPosts();
//   // const postIsLiked = postBlock.dataset.like;
//   // console.log(postIsLiked);
//   // const post = posts.find((c) => c.id == postId);
//   // if (!post) return;

//   // likes.classList.add('-loading-like');

//   // delay(2000).then(() => {
//   //   if (post.isLiked) {
//   //     post.likes--;
//   //   } else {
//   //     post.likes++;
//   //   }
//   //   post.isLiked = !comment.isLiked;
//   //   post.isLikeLoading = false;
//   //   renderPostsPageComponent();
//   // });
// };
























// const addLikesElements = () => {
//   // const postBlock = target.closest('.post');
//   // const postId = postBlock.dataset.id;
//   const likes = document.querySelector('.like-button');
//   console.log(likes);
//   // const comments = getComments();
//   // const comment = comments.find((c) => c.id == commentId);
//   // if (!comment) return;

//   // likes.classList.add('-loading-like');

//   // delay(2000).then(() => {
//   //   if (comment.isLiked) {
//   //     comment.likes--;
//   //   } else {
//   //     comment.likes++;
//   //   }
//   //   comment.isLiked = !comment.isLiked;
//   //   comment.isLikeLoading = false;
//   //   renderComments();
//   // });
// };

// addLikesElements();


// const appHtml = `
// <div class="page-container">
//   <div class="header-container"></div>
//   <ul class="posts">
//     ${renderPost()}
//     <li class="post">
//       <div class="post-header" data-user-id="6425602ce156b600f7858df2">
//           <img src="https://storage.yandexcloud.net/skypro-webdev-homework-bucket/1680601502867-%25C3%2590%25C2%25A1%25C3%2590%25C2%25BD%25C3%2590%25C2%25B8%25C3%2590%25C2%25BC%25C3%2590%25C2%25BE%25C3%2590%25C2%25BA%2520%25C3%2591%25C2%258D%25C3%2590%25C2%25BA%25C3%2591%25C2%2580%25C3%2590%25C2%25B0%25C3%2590%25C2%25BD%25C3%2590%25C2%25B0%25202023-04-04%2520%25C3%2590%25C2%25B2%252014.04.29.png" class="post-header__user-image">
//           <p class="post-header__user-name">Варварва Н.</p>
//       </div>
//       <div class="post-image-container">
//         <img class="post-image" src="https://storage.yandexcloud.net/skypro-webdev-homework-bucket/1680670675451-%25C3%2590%25C2%25A1%25C3%2590%25C2%25BD%25C3%2590%25C2%25B8%25C3%2590%25C2%25BC%25C3%2590%25C2%25BE%25C3%2590%25C2%25BA%2520%25C3%2591%25C2%258D%25C3%2590%25C2%25BA%25C3%2591%25C2%2580%25C3%2590%25C2%25B0%25C3%2590%25C2%25BD%25C3%2590%25C2%25B0%25202023-03-31%2520%25C3%2590%25C2%25B2%252012.51.20.png">
//       </div>
//       <div class="post-likes">
//         <button data-post-id="642cffed9b190443860c2f30" class="like-button">
//           <img src="./assets/images/like-not-active.svg">
//         </button>
//         <p class="post-likes-text">
//           Нравится: <strong>35</strong>
//         </p>
//       </div>
//       <p class="post-text">
//         <span class="user-name">Варварва Н.</span>
//         Нарисовала картину, посмотрите какая красивая
//       </p>
//       <p class="post-date">
//         3 часа назад
//       </p>
//     </li>
//     <li class="post">
//       <div class="post-header" data-user-id="6425602ce156b600f7858df2">
//           <img src="https://storage.yandexcloud.net/skypro-webdev-homework-bucket/1680601502867-%25C3%2590%25C2%25A1%25C3%2590%25C2%25BD%25C3%2590%25C2%25B8%25C3%2590%25C2%25BC%25C3%2590%25C2%25BE%25C3%2590%25C2%25BA%2520%25C3%2591%25C2%258D%25C3%2590%25C2%25BA%25C3%2591%25C2%2580%25C3%2590%25C2%25B0%25C3%2590%25C2%25BD%25C3%2590%25C2%25B0%25202023-04-04%2520%25C3%2590%25C2%25B2%252014.04.29.png" class="post-header__user-image">
//           <p class="post-header__user-name">Варварва Н.</p>
//       </div>
//       <div class="post-image-container">
//         <img class="post-image" src="https://leonardo.osnova.io/97a160ca-76b6-5cba-87c6-84ef29136bb3/">
//       </div>
//       <div class="post-likes">
//         <button data-post-id="642cf82e9b190443860c2f2b" class="like-button">
//           <img src="./assets/images/like-not-active.svg">
//         </button>
//         <p class="post-likes-text">
//           Нравится: <strong>0</strong>
//         </p>
//       </div>
//       <p class="post-text">
//         <span class="user-name">Варварва Н.</span>
//         Голова
//       </p>
//       <p class="post-date">
//         8 дней назад
//       </p>
//     </li>
//   </ul>
// </div>`;
