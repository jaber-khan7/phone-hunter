const showResults = document.getElementById("search-results");
const detailesSection = document.getElementById("detailes-section");
const searchResultSection = document.getElementById("show-search-result");
const errorMessage = document.getElementById("error-message");
const spinner = document.getElementById("spinner");
errorMessage.style.display = "none";
spinner.style.display = "none";

// add event listener to the search button
const searchButton = document.getElementById("button-addon2");
searchButton.addEventListener("click", function () {
  // show spinner
  errorMessage.style.display = "none";
  spinner.style.display = "block";
  showResults.textContent = "";
  const searchField = document.getElementById("search-field");
  const searchFieldValue = searchField.value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`;

  // hit api to search phone by name
  fetch(url)
    .then((res) => res.json())
    .then((data) => showSearchResult(data.data));

  // clear field
  searchField.value = "";
});

// show search result
const showSearchResult = (phones) => {
  phones.slice(0, 20).forEach((phone) => {
    // show results
    const col = document.createElement("div");
    col.classList.add("col");

    const singleProduct = document.createElement("div");
    singleProduct.classList.add(
      "single-product",
      "card",
      "h-100",
      "shadow-lg",
      "d-flex",
      "flex-column"
    );
    col.appendChild(singleProduct);

    // create imgae tag in single product
    const image = document.createElement("img");
    image.setAttribute("src", `${phone.image}`);
    singleProduct.appendChild(image);

    // create h6 tag in single product
    const h5 = document.createElement("h5");
    h5.innerText = `${phone.phone_name}`;
    h5.classList.add("mt-4", "mb-0");
    singleProduct.appendChild(h5);

    // create h6 tag in single product
    const p = document.createElement("p");
    p.innerText = `${phone.brand}`;
    p.classList.add("color-primary");
    singleProduct.appendChild(p);

    // create a button in single product
    const showDetailesButton = document.createElement("button");
    showDetailesButton.innerText = `Show Detailes`;
    showDetailesButton.classList.add("me-auto", "my-2");
    showDetailesButton.setAttribute("onclick", `loadDetailes('${phone.slug}')`);
    singleProduct.appendChild(showDetailesButton);

    // append div in show result
    showResults.appendChild(col);
  });

  // hide spinner
  spinner.style.display = "none";

  try {
    if (phones.length === 0) throw "404 Product not found";
    else {
      errorMessage.style.display = "none";
    }
  } catch (err) {
    errorMessage.innerText = err;
    errorMessage.classList.add("text-center");
    errorMessage.style.display = "block";
    errorMessage.style.color = "var(--color-primary";
    errorMessage.style.fontFamily = "cursive";
  }
};

// load detailes when click the show detailes button
const loadDetailes = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

  // hit api to load product detailes by id
  fetch(url)
    .then((res) => res.json())
    .then((data) => showProductDetailes(data.data));
};

const headerSection = document.getElementById("header");
const showDetailes = document.getElementById("show-detailes");
// show product detailes
const showProductDetailes = (data) => {
  showDetailes.textContent = "";
  detailesSection.style.display = "block";
  searchResultSection.style.display = "none";
  headerSection.style.display = "none";

  // create column one
  const columnPicture = document.createElement("div");
  columnPicture.classList.add("col");
  showDetailes.appendChild(columnPicture);

  const productImage = document.createElement("div");
  productImage.classList.add(
    "product-image",
    "d-lg-flex",
    "justify-content-lg-center"
  );
  columnPicture.appendChild(productImage);

  const image = document.createElement("img");
  image.setAttribute("src", `${data.image}`);
  productImage.appendChild(image);
  // column one end

  // create main features column
  const columnMainFeatures = document.createElement("div");
  columnMainFeatures.classList.add("col");
  showDetailes.appendChild(columnMainFeatures);

  const mainFeaturesBox = document.createElement("div");
  mainFeaturesBox.classList.add("main-features-box", "py-4", "py-lg-0");
  columnMainFeatures.appendChild(mainFeaturesBox);

  const mainHeader = document.createElement("h5");
  mainHeader.innerText = `Main Features:`;
  mainHeader.style.color = "var(--color-primary)";
  mainFeaturesBox.appendChild(mainHeader);

  // create a dl section
  const dl = document.createElement("dl");
  mainFeaturesBox.appendChild(dl);

  // dt one
  const dt1 = document.createElement("dt");
  dt1.innerText = `Chip Set:`;
  dl.appendChild(dt1);
  const dd1 = document.createElement("dd");
  dd1.classList.add("dd");
  dd1.innerText = `${data?.mainFeatures?.chipSet}`;
  dt1.appendChild(dd1);

  // dt two
  const dt2 = document.createElement("dt");
  dt2.innerText = `Display Size:`;
  dl.appendChild(dt2);
  const dd2 = document.createElement("dd");
  dd2.classList.add("dd");
  dd2.innerText = `${data?.mainFeatures?.displaySize}`;
  dt2.appendChild(dd2);

  // dt three
  const dt3 = document.createElement("dt");
  dt3.innerText = `Memory:`;
  dl.appendChild(dt3);
  const dd3 = document.createElement("dd");
  dd3.classList.add("dd");
  dd3.innerText = `${data?.mainFeatures?.memory}`;
  dt3.appendChild(dd3);

  // dt four
  const dt4 = document.createElement("dt");
  dt4.innerText = `Storage:`;
  dl.appendChild(dt4);
  const dd4 = document.createElement("dd");
  dd4.classList.add("dd");
  dd4.innerText = `${data?.mainFeatures?.storage}`;
  dt4.appendChild(dd4);

  // dt four
  const dt5 = document.createElement("dt");
  dt5.innerText = `Sensors:`;
  dl.appendChild(dt5);

  const sensors = document.createElement("dl");
  const sensorsName = document.createElement("dt");
  sensors.appendChild(sensorsName);

  // sensor one name
  const sensorName = document.createElement("dd");
  sensorName.classList.add("dd");
  sensorName.innerText = `${data?.mainFeatures?.sensors[0]}, ${data?.mainFeatures?.sensors[1]}, ${data?.mainFeatures?.sensors[2]}, ${data?.mainFeatures?.sensors[3]}, ${data?.mainFeatures?.sensors[4]}, ${data?.mainFeatures?.sensors[5]}`;
  sensorsName.appendChild(sensorName);

  // append sensors in dt5
  dt5.appendChild(sensors);
  // column two end

  // create other features column
  const columnOtherFeatures = document.createElement("div");
  columnOtherFeatures.classList.add("col");

  const otherFeatures = document.createElement("div");
  otherFeatures.classList.add("other-features");
  columnOtherFeatures.appendChild(otherFeatures);

  // create child of other features
  const otherFeaturesHeader = document.createElement("h5");
  otherFeaturesHeader.innerText = `Other Features:`;
  otherFeaturesHeader.style.color = "var(--color-primary)";
  otherFeatures.appendChild(otherFeaturesHeader);

  // create dl for show other features
  const dlOthers = document.createElement("dl");
  otherFeatures.appendChild(dlOthers);

  // create child of dlOthers

  // dt one
  const dtOthers1 = document.createElement("dt");
  dtOthers1.innerText = `Bluetooth:`;
  dlOthers.appendChild(dtOthers1);
  const ddOthers1 = document.createElement("dd");
  ddOthers1.classList.add("dd");
  ddOthers1.innerText = `${data?.others?.Bluetooth}`;
  dtOthers1.appendChild(ddOthers1);

  // dt two
  const dtOthers2 = document.createElement("dt");
  dtOthers2.innerText = `GPS:`;
  dlOthers.appendChild(dtOthers2);
  const ddOthers2 = document.createElement("dd");
  ddOthers2.classList.add("dd");
  ddOthers2.innerText = `${data?.others?.GPS}`;
  dtOthers2.appendChild(ddOthers2);

  // dt three
  const dtOthers3 = document.createElement("dt");
  dtOthers3.innerText = `NFC:`;
  dlOthers.appendChild(dtOthers3);
  const ddOthers3 = document.createElement("dd");
  ddOthers3.classList.add("dd");
  ddOthers3.innerText = `${data?.others?.NFC}`;
  dtOthers3.appendChild(ddOthers3);

  // dt four
  const dtOthers4 = document.createElement("dt");
  dtOthers4.innerText = `Radio:`;
  dlOthers.appendChild(dtOthers4);
  const ddOthers4 = document.createElement("dd");
  ddOthers4.classList.add("dd");
  ddOthers4.innerText = `${data?.others?.Radio}`;
  dtOthers4.appendChild(ddOthers4);

  // dt five
  const dtOthers5 = document.createElement("dt");
  dtOthers5.innerText = `USB:`;
  dlOthers.appendChild(dtOthers5);
  const ddOthers5 = document.createElement("dd");
  ddOthers5.classList.add("dd");
  ddOthers5.innerText = `${data?.others?.USB}`;
  dtOthers5.appendChild(ddOthers5);

  // dt six
  const dtOthers6 = document.createElement("dt");
  dtOthers6.innerText = `WLAN:`;
  dlOthers.appendChild(dtOthers6);
  const ddOthers6 = document.createElement("dd");
  ddOthers6.classList.add("dd");
  ddOthers6.innerText = `${data?.others?.WLAN}`;
  dtOthers6.appendChild(ddOthers6);

  // append column three in row
  showDetailes.appendChild(columnOtherFeatures);
  // column three end
};

const hideDetailesSection = () => {
  detailesSection.style.display = "none";
  searchResultSection.style.display = "block";
  headerSection.style.display = "block";
};
