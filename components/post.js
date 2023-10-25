export const renderPost = () => {
    return `<li class="post">
                <div class="post-header" data-user-id="642d00329b190443860c2f31">
                    <img src="https://www.imgonline.com.ua/examples/bee-on-daisy.jpg" class="post-header__user-image">
                    <p class="post-header__user-name">Иван Иваныч</p>
                </div>
                <div class="post-image-container">
                <img class="post-image" src="https://www.imgonline.com.ua/examples/bee-on-daisy.jpg">
                </div>
                <div class="post-likes">
                <button data-post-id="642d00579b190443860c2f32" class="like-button">
                    <img src="./assets/images/like-active.svg">
                </button>
                <p class="post-likes-text">
                    Нравится: <strong>2</strong>
                </p>
                </div>
                <p class="post-text">
                <span class="user-name">Иван Иваныч</span>
                Ромашка, ромашка...
                </p>
                <p class="post-date">
                19 минут назад
                </p>
            </li>`
}