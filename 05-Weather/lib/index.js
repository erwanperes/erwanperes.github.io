/* eslint-disable default-case */
// Méthode pour insérer les résultats dans la liste
function insertResults(data) {
  const city = document.getElementById('city');
  const dateElement = document.getElementById('date');
  const iconElement = document.getElementById('icon');
  const temperature = document.getElementById('temperature');

  if (city) {
    city.innerText = data.name;
  }

  if (dateElement) {
    const date = new Date(data.dt * 1000); // Convertir le timestamp en date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    dateElement.innerText = `Date: ${date.toLocaleDateString(undefined, options)}`;
  }

  if (iconElement) {
    const iconCode = data.weather[0].icon;
    iconElement.src = `https://openweathermap.org/img/w/${iconCode}.png`;
    iconElement.alt = data.weather[0].description;
  }

  if (temperature) {
    temperature.innerText = data.main.temp.toFixed(1);
  }
}

const fetchWeather = (ville) => {
  const apikey = "2a8e9789e5e8ddb764149bf954c40b51";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${apikey}`;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      // TODO: Insert the weather info in the DOM (description, date, temperature...)
      insertResults(data);
    })
    .catch(error => console.error('Error fetching weather data:', error));
};

// Début
const form = document.querySelector('form');
const errorMessage = document.getElementById('error-message');
const nomInput = document.getElementById('input');
// const currentLocationButton = document.getElementById('currentLocation');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const ville = nomInput.value;

  // Appel de la fonction fetchWeather avec la ville entrée
  if (ville === '') {
    errorMessage.innerText = 'Please enter a city name.';
    errorMessage.classList.add('d-block');
    errorMessage.classList.remove('d-none');
  } else {
    errorMessage.innerText = '';
    errorMessage.classList.add('d-none');
    errorMessage.classList.remove('d-block');
    fetchWeather(ville);
  }
});

// Ajouter un eventListener pour l'événement 'focus'
nomInput.addEventListener('focus', () => {
  errorMessage.innerText = ''; // Efface le message d'erreur précédent
  errorMessage.classList.add('d-none');
  errorMessage.classList.remove('d-block');
});

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  alert(`Latitude: ${latitude}\nLongitude: ${longitude}`);

  const apikey = "2a8e9789e5e8ddb764149bf954c40b51";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      // TODO: Insert the weather info in the DOM (description, date, temperature...)
      insertResults(data);
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("L'utilisateur a refusé la demande de géolocalisation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("L'information de géolocalisation n'est pas disponible.");
      break;
    case error.TIMEOUT:
      alert("La demande de géolocalisation a expiré.");
      break;
    case error.UNKNOWN_ERROR:
      alert("Une erreur inconnue s'est produite.");
      break;
  }
}

document.getElementById('currentLocation').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("La géolocalisation n'est pas supportée par ce navigateur.");
  }
});
