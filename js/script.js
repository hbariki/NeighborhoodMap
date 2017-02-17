//https://www.youtube.com/watch?v=JGwRIbWWqjE
var places = [
    {
        name: "Dish dash",
        address: "Murphy Ave, Sunnyvale, CA",
        lat: 37.7739,
        lng: -122.4292
    },
    {
        name: "Bawarchi",
        address: "ElcaminoReal, Sunnyvale, CA",
        lat: 36.7739,
        lng: -122.4292
    },
    {
        name: "P.F chang's",
        address: "cherry Orchard shopping center, 390W El Camino Real, Sunnyvale, CA",
        lat: 37.7122,
        lng: -122.4219
    },
    {
        name:"Yard house",
        address:"Santana Row, 300 Santana Row 101, San Jose, CA 95128",
        lat:37.6921,
        lng:-122.4220
    },
    {
        name:"Peacock Restaurant",
        address:"2760 Aborn Rd, San Jose, CA 95121",
        lat:37.529,
        lng:-122.559
    },
    {
        name:"Bamboo Garden",
        address:"151 W Washington Ave, Sunnyvale, CA 94087",
        lat:37.692,
        lng:-121.229
    }


];

var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:37.773972, lng:-122.431297},
    scrollwheel: true,
    zoom:4
});

places.forEach(function(place) {
    addMarker(place);
});

function addMarker(place) {

    var infowindow = new google.maps.InfoWindow({
        content: place.name + '<br>' + place.address
    });

    var marker = new google.maps.Marker({
        position: {lat:place.lat, lng:place.lng},
        map: map,
        title: 'San Francisco'
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}