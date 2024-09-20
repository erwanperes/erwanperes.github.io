const searchForm = document.getElementById("searchForm");
const restaurantList = document.getElementById('restaurant-list');

function insertResults(data) {
  restaurantList.innerHTML = '';
  if (data.length > 0) {
    data.forEach((restaurant) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${restaurant.name} - ${restaurant.address} - ${restaurant.category}`;
      listItem.classList.add('list-group-item');
      restaurantList.appendChild(listItem);
    });
  } else {
    const listItem = document.createElement('li');
    listItem.textContent = 'No restaurants found.';
    listItem.classList.add('list-group-item');
    restaurantList.appendChild(listItem);
  }
}

// Méthode pour construire l'URL de recherche
function buildSearchUrl() {
  const radioButtons = searchForm.querySelectorAll('input[type="radio"][name="category"]');
  let selectedValue;
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
    }
  });

  const locationInput = searchForm.querySelector('#location');
  const locationValue = locationInput.value.trim();

  let apiUrl = `https://the-fork.api.lewagon.com/api/v1/restaurants?category=${selectedValue}`;

  if (locationValue) {
    apiUrl += `&location=${encodeURIComponent(locationValue)}`;
  }

  return apiUrl;
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const apiUrl = buildSearchUrl();

  fetch(apiUrl)
    .then(response => response.json())
    .then((data) => {
      insertResults(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
