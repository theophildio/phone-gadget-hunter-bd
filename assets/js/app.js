// Common Function 
const getId = (id) => {
  const callId = document.getElementById(id);
  return callId;
};

// Search Phones
const searchPhone = () => {
  const getSearchText = getId('search-text');
  const getSearchValue = getSearchText.value.toLowerCase();
  const errorMsg = getId('error-msg');
  if ( getSearchValue === '' || isNaN(getSearchValue) === false ) {
    const displayPhones = getId('display-results');
    displayPhones.textContent = '';
    errorMsg.innerText = 'Please type valid phone brand name.';
  } else {
    errorMsg.innerText = '';
    // Create url
    const url = `https://openapi.programming-hero.com/api/phones?search=${getSearchValue}`;
    fetch(url)
    .then(response => response.json())
    .then(phones => {
      const allPhones = phones.data;
      const load = allPhones.filter((phoneName) => {
        return phoneName.phone_name.toLowerCase().includes([])
      });
      if (load == '') {
        const displayPhones = getId('display-results');
        displayPhones.textContent = '';
        errorMsg.innerText = 'No phone found';
      } else {
        getPhones(load);
      }
    });
  };
  // Clear search box
  getSearchText.value = '';
  // Clear Phone Details
  const clearPhoneDetails = getId('phone-details');
  clearPhoneDetails.textContent = '';
};

// Display Results 
const getPhones = phones => {
  const displayPhones = getId('display-results');
  // Clear Previous Data
  displayPhones.textContent = '';
  // Show Data
  let allPhones = phones;
  const show20Phones = phones.slice(0, 20);
  show20Phones.forEach(phone => {
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

  const allBtn = getId('load-more');
  allBtn.style.display = 'block';

  getId('load-more').addEventListener('click', function() {
    const displayPhones = getId('display-results');
  // Clear Previous Data
  displayPhones.textContent = '';
  // Show Data
  allPhones.forEach(phone => {
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
    
    const allBtn = getId('load-more');
    allBtn.style.display = 'none';
  });
}; 

// Get Phone Details Slug
const showDetails = phoneSlug => {
  const phoneDetailsUrl = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
  fetch(phoneDetailsUrl)
  .then(response => response.json())
  .then(slugs => getPhoneDetails(slugs.data))
};
const close = () => {
  const closeDetails = getId('phone-details');
  closeDetails.style.display = 'none';
  return closeDetails;
};

// Show Phone Details 
const getPhoneDetails = details => {
  const detailsClose = getId('phone-details');
  detailsClose.style.display = 'block';
  const showPhoneDetails = getId('phone-details');
  showPhoneDetails.textContent = '';
  const div = document.createElement('div');
  div.innerHTML = `<div class="card mb-3 p-2 shadow-lg">
                      <div class="row g-0">
                        <div class="col-md-4">
                          <img src="${details.image}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title">${details.name}</h5>
                            <button onclick="detailsClose()" id="details-close" class="btn btn-danger">X</button>
                            <p class="card-text"><small>Brand:</small> ${details.brand}</p>
                            <p class="card-text"><small>${details.releaseDate ? details.releaseDate : 'No release date found'}</small></p>
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
                              <div>
                                <h5 class="card-title">Other Specification</h5>
                                <div class="details">
                                  <ul>
                                    <li>WLAN: <small>${details.others ? details.others.WLAN : 'N/A'}</small></li>
                                    <li>Bluetooth: <small>${details.others ? details.others.Bluetooth : 'N/A'}</small></li>
                                    <li>GPS: <small>${details.others ? details.others.GPS : 'N/A'}</small></li>
                                    <li>NFC: <small>${details.others ? details.others.NFC : 'N/A'}</small></li>
                                    <li>Radio: <small>${details.others ? details.others.Radio : 'N/A'}</small></li>
                                    <li>USB: <small>${details.others ? details.others.USB : 'N/A'}</small></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`;
  showPhoneDetails.appendChild(div);
};

// Close the phone details pop up
const detailsClose = () => {
  const detailsClose = getId('phone-details');
  detailsClose.style.display = 'none';
}