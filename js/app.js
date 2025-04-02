let countryContainer = document.getElementById("countries-container");
let searchBtn = document.getElementById("search-button");
let searchTxt = document.getElementById("search-input");
let countriesArrayList = [];

function loadContries() {
    try {
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(result => {
                countriesArrayList = result;

                result.forEach((data, index) => {
                    countryContainer.innerHTML += `
                    <div class="col-12 col-md-6 col-lg-4 col-xl-3 p-2">
                        <div class="card country-card shadow-sm h-100">
                            <img src="${data.flags.png}" class="card-img-top flag-img" alt="flag">
                            <div class="card-body">
                                <h5 class="card-title text-center">${data.name.common}</h5>
                               <!-- <p class="card-text">
                                    <i class="bi bi-globe-americas me-2"></i>${data.region}<br>
                                    <i class="bi bi-people me-2"></i> ${data.population}<br>
                                    <i class="bi bi-book-half me-2"></i>${data.capital[0]}<br>
                                </p> -->
                            </div>

                            <div class="card-footer bg-transparent border-top-0">
                                <button class="btn btn-primary btn-sm w-100 view-details" data-bs-toggle="modal" data-bs-target="#country-modal" onclick="detailsOpen(${index})">
                                        <i class="bi bi-info-circle me-1"></i> Details
                                </button>
                            </div>
                        </div>
                    </div>`
                });
            })
    } catch (error) {
        alert("Something went wrong" + error);
    }
}


loadContries();



function detailsOpen(index) {

    let modalBody = document.getElementById("countryModalBody");
    let modalFooter = document.getElementById("modal-footer-btn");

    modalBody.innerHTML = `<div class="card ">
                                 <img src="${countriesArrayList[index].flags.png}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title text-center">${countriesArrayList[index].name.common}</h5></br>
                                    <lable class="card-text form-label"><b>Population :</b> ${countriesArrayList[index].population}</lable></br>
                                    <lable class="card-text form-label"><b>Region :</b> ${countriesArrayList[index].region}</lable></br>
                                    <lable class="card-text form-label"><b>Start of week :</b> ${countriesArrayList[index].startOfWeek}</lable></br>
                                    <lable class="card-text form-label"><b>Capital    :</b> ${countriesArrayList[index].capital[0]}</lable>
                                </div>
                                <div class="card-footer text-body-secondary text-center">${countriesArrayList[index].timezones[0]}</div>
                            </div>`

    modalFooter.innerHTML = `<div class="col-6">
                                <a target="_blank" class="btn btn-success w-100" onclick="openMap(${index})"><i class="bi bi-geo-alt"></i> &nbsp; Open With Map</a>
                            </div>

                            <div class="col-6">
                                <button type="button" class="btn btn-outline-danger w-100"data-bs-dismiss="modal">Close</button>
                            </div>`

    console.log(countriesArrayList);

}

function openMap(index) {
    window.open(countriesArrayList[index].maps.googleMaps, "_blank");
}


searchBtn.addEventListener("click", () => {
    // let searchTxt = document.getElementById("search-input").value;

    if (searchTxt.value === "") {
        window.location.reload();
    } else {
        let index = 0;
        countriesArrayList.forEach((data) => {
            if (data.name.common === searchTxt.value) {
                loadCountryFilter(data, index);
                searchTxt.value = "";
            }
            index++;
        })
    }
})



function loadCountryFilter(data, index) {
    console.log(data);
    console.log(index);
    countryContainer.innerHTML = `
    <div class="col-12 col-md-6 col-lg-4 col-xl-3 p-2">
        <div class="card country-card shadow-sm h-100">
            <img src="${data.flags.png}" class="card-img-top flag-img" alt="flag">
            <div class="card-body">
                <h5 class="card-title text-center">${data.name.common}</h5>
               <!-- <p class="card-text">
                    <i class="bi bi-globe-americas me-2"></i>${data.region}<br>
                    <i class="bi bi-people me-2"></i> ${data.population}<br>
                    <i class="bi bi-book-half me-2"></i>${data.capital[0]}<br>
                </p> -->
            </div>

            <div class="card-footer bg-transparent border-top-0">
                <button class="btn btn-primary btn-sm w-100 view-details" data-bs-toggle="modal" data-bs-target="#country-modal" onclick="detailsOpen(${index})">
                        <i class="bi bi-info-circle me-1"></i> Details
                </button>
            </div>
        </div>
    </div>`
}