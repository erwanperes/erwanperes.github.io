const showMap = (userInput) => {
  const apiKey = 'GyYJtHCblSJ8mxeSv7YY'; // Remplacez par votre clé API
  const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(userInput)}.json?key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].geometry.coordinates;
        document.getElementById('result').innerText = `Latitude: ${lat}, Longitude: ${lng}`;

        // Initialiser la carte
        // eslint-disable-next-line no-undef
        const map = new maplibregl.Map({
          container: 'map',
          style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
          center: [lng, lat],
          zoom: 13
        });

        // Ajouter un marqueur à la carte
        // eslint-disable-next-line no-undef
        new maplibregl.Marker()
          .setLngLat([lng, lat])
          .addTo(map);
      } else {
        document.getElementById('result').innerText = 'Adresse non trouvée.';
      }
    })
    .catch((error) => {
      console.error('Erreur:', error);
      document.getElementById('result').innerText = 'Erreur lors de la récupération des coordonnées.';
    });
};

document.getElementById('addressForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const address = document.getElementById('address').value;
  showMap(address);
});
