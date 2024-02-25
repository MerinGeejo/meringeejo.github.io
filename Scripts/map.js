let map;
let durhamCollegeMarker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.9452, lng: -78.8959 },
        zoom: 14,
    });

    // Create a marker at Durham College
    durhamCollegeMarker = new google.maps.Marker({
        position: { lat: 43.9452, lng: -78.8959 },
        map: map,
        title: "Durham College"
    });
}

initMap();