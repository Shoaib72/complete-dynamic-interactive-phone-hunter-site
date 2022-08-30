const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) => {

    const warningArea = document.getElementById('no-phone-message');
    if (phones.length === 0) {
        warningArea.classList.remove('d-none');
        loader(false);

    }
    else {
        warningArea.classList.add('d-none');

    }
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerText = '';
    const showAll = document.getElementById('btn-show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
           <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
           <div class="card-body">
               <h5 class="card-title">${phone.phone_name}</h5>
               <p class="card-text">${phone.slug}</p>
               <button href='#' class="btn btn-primary" onclick="loadPhoneDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);

        loader(false);
    })
}
const processSearch = (dataLimit) => {
    loader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);

})

const loader = (isLoading) => {
    const loaderWorkStart = document.getElementById('loader');
    if (isLoading) {
        loaderWorkStart.classList.remove('d-none');
    }
    else {
        loaderWorkStart.classList.add('d-none');
    }
}

document.getElementById('show-all').addEventListener('click', function () {

    processSearch();
})

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = (phone) => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
        <p>Chipset: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No chipset found'} </p>
        <p>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'no display size found'} </p>
        <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'no memory found'} </p>
    `;
}
// loadPhones();