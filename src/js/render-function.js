export function imgTemplate(photo) {
  return photo.hits
    .map(
      hit => `<li class="gallery-item">
    <a href=${hit.largeImageURL} class="gallery-link">
     <img
      class="gallery-image"
      src= ${hit.webformatURL}
      alt=${hit.tags}
     />
    </a>
    <div class="image-container">
      <ul class="text-list">
        <li>
          <h3>Likes</h3>
          <p class="image-description">${hit.likes}</p>
        </li>
        <li>
          <h3>Views</h3>
          <p class="image-description">${hit.views}</p>
        </li>
        <li>
          <h3>Comments</h3>
          <p class="image-description">${hit.comments}</p>
        </li>
        <li>
          <h3>Downloads</h3>
          <p class="image-description">${hit.downloads}</p>
        </li>
      </ul>
    </div>
  </li>`
    )
    .join('');
}
