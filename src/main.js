import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { imgTemplate } from './js/render-function';
import { getPhoto } from './js/pixabay-api';
const loader = document.querySelector('.loader');

loader.style.display = 'none';

const refreshPage = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  widthRatio: 1,
  height: '500px',
});

const formEl = document.querySelector('.form-search');
const imagesUl = document.querySelector('.gallery');

const loadMoreBtn = document.querySelector('.load-btn');

let currentPage = 1;
let value = '';
let maxPage = 1;
const perPage = 15;
formEl.addEventListener('submit', async e => {
  e.preventDefault();
  currentPage = 1;
  loader.style.display = 'block';
  value = formEl.elements.request.value.trim();
  if (!value) {
    iziToast.show({
      message: 'Please,  enter a picture',
      messageColor: 'white',
      backgroundColor: 'red',
      progressBarColor: 'white',
    });
  } else {
    try {
      const data = await getPhoto(value, currentPage);
      maxPage = Math.ceil(data.totalHits / perPage);
      loader.style.display = 'none';
      if (!data.hits.length) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: 'white',
          backgroundColor: 'red',
          progressBarColor: 'white',
        });
      }
      const markup = imgTemplate(data);
      imagesUl.innerHTML = markup;
      updateBtnStatus();
      refreshPage.refresh();
    } catch (err) {
      console.log(err);
    }
  }

  formEl.elements.request.value = '';
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  const data = await getPhoto(value, currentPage);
  const markup = imgTemplate(data);
  imagesUl.insertAdjacentHTML('beforeend', markup);
  refreshPage.refresh();
  scrollElem();
  updateBtnStatus();
});

function updateBtnStatus() {
  if (currentPage >= maxPage) {
    hideBtn();
  } else {
    showBtn();
  }
}

function showBtn() {
  loadMoreBtn.classList.remove('hidden');
}

function hideBtn() {
  loadMoreBtn.classList.add('hidden');
  if (maxPage !== 0) {
    iziToast.show({
      message: 'We are sorry, but you have reached the end of search results',
      messageColor: 'white',
      backgroundColor: 'red',
      progressBarColor: 'white',
    });
  }
}

function scrollElem() {
  const liElem = imagesUl.children[0];
  const height = liElem.getBoundingClientRect().height;
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
