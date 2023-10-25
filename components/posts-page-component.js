import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { renderPost } from "./post.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  
  console.log("Актуальный список постов:", posts);
  const postsHtml = posts.map((post) => {
    renderPost(post);
  }).join('');

  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${ postsHtml }
      </ul>
    </div>`;
  
  appEl.innerHtml = appHtml;

  

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
