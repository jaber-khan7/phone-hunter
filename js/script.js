// add event listener to the search button
const searchButton = document.getElementById("button-addon2");
searchButton.addEventListener("click", function () {
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
  phones.forEach((phone) => {
    // show results
    const showResults = document.getElementById("search-results");
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
};

// load detailes when click the show detailes button
const loadDetailes = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

  // hit api to load product detailes by id
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data));
};
