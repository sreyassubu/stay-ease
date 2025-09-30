
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 10 // starting zoom
});

// 1. Create a div for the marker
const el = document.createElement('div');
el.style.fontSize = '30px';  // adjust icon size
el.style.color = '#e74c3c';  // icon color
el.style.cursor = 'pointer';

// 2. Inject the Font Awesome icon HTML
el.innerHTML = '<i class="fa-regular fa-compass"></i>'; 

 // Create a marker and add it to the map with popup.
 const marker1 = new mapboxgl.Marker(el)
 .setLngLat(listing.geometry.coordinates)
 .setPopup(new mapboxgl.Popup()
 .setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking</p>`)
 .setMaxWidth("300px")
 .addTo(map))
 .addTo(map);
