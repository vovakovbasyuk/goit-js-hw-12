import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '44400646-52d28046ae8ecec8adffea605',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 15,
};

export async function getPhoto(userWord, currentPage) {
  const params = new URLSearchParams({
    q: userWord,
    page: currentPage,
  });
  const url = `/?${params}`;
  const res = await axios.get(url);
  return res.data;
}
