
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

const getSafeString = (str) =>
  str
    .trim()
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container">
            <div class="upload=image">
              <label class="file-upload-label secondary-button">
                  <input type="file" class="file-upload-input" style="display:none">
                  Выберите фото
              </label>
            </div>
          </div>
          <label>Опишите фотографию:
            <textarea id="description" class="input textarea" rows="4"></textarea>
          </label>
          <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      let description = document.getElementById('description');

      if (!description.value) {
        alert("введите описание");
        return;
      }

      if (!imageUrl) {
        alert("Не выбрана фотография");
        return;
      }

      onAddPostClick({
        description: getSafeString(description.value),
        imageUrl: imageUrl,
      })

      
      // .catch((error) => {
      //   console.error(error)
      //   if (error.message === "Выберите фото и добавьте комментарий") {
      //     alert('Выберите фото и добавьте комментарий');
      //     return;
      //   }

      //   alert('Ошибка соединения, попробуй позже');
      //   return;
      // })
    });
  };

  render();
}