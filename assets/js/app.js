// Search Phone
const searchPhone = () => {
  const getSearchText = document.getElementById('search-text');
  const getSearchValue = getSearchText.value;
  const convertValue = getSearchValue.toLowerCase();
  // Clear search box
  getSearchText.value = '';
  // Create url
  const url = `https://openapi.programming-hero.com/api/phones?search=${getSearchValue}`;
  fetch(url)
  .then(response => response.json())
  .then(phone => console.log(phone.data))
}