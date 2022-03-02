// Search Phones
const searchPhone = () => {
  const getSearchText = document.getElementById('search-text');
  const getSearchValue = getSearchText.value.toLowerCase();
  // Clear search box
  getSearchText.value = '';
  // Create url
  const url = `https://openapi.programming-hero.com/api/phones?search=${getSearchValue}`;
  fetch(url)
  .then(response => response.json())
  .then(phones => getPhones(phones.data.slice(0, 20)))
};

// Display Results 
const getPhones = data => {
  const displayPhones = document.getElementById('display-results');
  // Clear Previous Data
  displayPhones.textContent = '';
  // Show Data
  data.forEach(phone => {
    // console.log(phone);
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
              <button onclick="showDetails('${phone.slug}')" class="btn btn-info px-4 text-light text-capitalize shadow-none">details</button>
            </div>
          </div>
        </div>
      </div>`;
      displayPhones.appendChild(div);
  });
};

// Get Phone Details Slug
const showDetails = phoneSlug => {
  const phoneDetailsUrl = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
  fetch(phoneDetailsUrl)
  .then(response => response.json())
  .then(slugs => getPhoneDetails(slugs.data))
};

 // Show Phone Details 
const getPhoneDetails = details => {
  console.log(details);
  const showPhoneDetails = document.getElementById('phone-details');
  showPhoneDetails.textContent = '';
  const div = document.createElement('div');
  div.innerHTML = `<div class="card mb-3 p-2 shadow-sm">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${details.image}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${details.name}</h5>
          <p class="card-text"><small>Brand:</small> ${details.brand}</p>
          <p class="card-text"><small>${details.releaseDate}</small></p>
          <div class="phone-specification">
            <h5 class="card-title">Main Specification</h5>
            <div class="details">
              <ul>
                <li>Storage: <small>${details.mainFeatures.storage}</small></li>
                <li>Display: <small>${details.mainFeatures.displaySize}</small></li>
                <li>Chip Set: <small>${details.mainFeatures.chipSet}</small></li>
                <li>Memory: <small>${details.mainFeatures.memory}</small></li>
              </ul>
            </div>
            <h5 class="card-title">Sensors</h5>
            <div class="details">
              <ul>
                <li>Sensors: <small>${details.mainFeatures.sensors}</small></li>
              </ul>
            <h5 class="card-title">Other Specification</h5>
            <div class="details">
              <ul>
                <li>WLAN: <small>${details.others.WLAN}</small></li>
                <li>Bluetooth: <small>${details.others.Bluetooth}</small></li>
                <li>GPS: <small>${details.others.GPS}</small></li>
                <li>NFC: <small>${details.others.NFC}</small></li>
                <li>Radio: <small>${details.others.Radio}</small></li>
                <li>USB: <small>${details.others.USB}</small></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  showPhoneDetails.appendChild(div);
};