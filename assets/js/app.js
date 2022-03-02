// Search 20 Phones
const search20Phone = () => {
  const getSearchText = document.getElementById('search-text');
  const getSearchValue = getSearchText.value;
  const convertValue = getSearchValue.toLowerCase();
  // Clear search box
  getSearchText.value = '';
  // Create url
  const url = `https://openapi.programming-hero.com/api/phones?search=${getSearchValue}`;
  fetch(url)
  .then(response => response.json())
  .then(phones => get20Phones(phones.data.slice(0, 20)))
};

// Display 20 results 
const get20Phones = data => {
  const displayPhones = document.getElementById('display-results');
  data.forEach(phone => {
    console.log(phone);
    const div = document.createElement('div');
    div.innerHTML = `<div class="card mb-3 shadow-sm">
        <div class="row g-0">
          <div class="col-md-4 p-2">
            <img src="${phone.image}" class="img-fluid rounded-start" alt="Phone">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text"><small>Brand:</small> ${phone.brand}</p>
              <button class="btn btn-info px-4 text-light text-capitalize">details</button>
            </div>
          </div>
        </div>
      </div>`;
      /* displayPhones.appendChild(div);
      const loadMoreBtn = document.querySelector('.load-more');
      loadMoreBtn.style.display = 'block'; */
  });
};


