//https://www.youtube.com/watch?v=JGwRIbWWqjE
// place API - https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.773972,-122.431297&radius=500&type=restaurant&key=AIzaSyADRCnKHQ97WEx8h-pHJM-i7vMEnVGoZpw

    var places = [
        {
            "lat" : 37.7723603,
            "lng" : -122.4298578,
            "name" : "Nickies",
            "address" : "466 Haight Street, San Francisco"
        }, {
            "lat" : 37.7723435,
            "lng" : -122.4306506,
            "name" : "Wonderland Restaurant",
            "address" : "500 Haight Street, San Francisco"
        }, {
            "lat" : 37.7721618,
            "lng" : -122.431029,
            "name" : "Mad Dog in the Fog",
            "address" : "530 Haight St, San Francisco"
        }, {
            "lat" : 37.7720413,
            "lng" : -122.4319365,
            "name" : "Maven",
            "address" : "598 Haight Street, San Francisco"
        }, {
            "lat" : 37.77185900000001,
            "lng" : -122.4332758,
            "name" : "Danny Coyle's",
            "address" : "668 Haight Street, San Francisco"
        }, {
            "lat" : 37.7713322,
            "lng" : -122.4301785,
            "name" : "Cafe du Soleil",
            "address" : "200 Fillmore Street, San Francisco"
        }, {
            "lat" : 37.7718393,
            "lng" : -122.4311166,
            "name" : "Rosamunde Sausage Grill",
            "address" : "545 Haight Street, San Francisco"
        }, {
            "lat" : 37.7721331,
            "lng" : -122.4289427,
            "name" : "Two Jacks Nik's Place",
            "address" : "401 Haight Street, San Francisco"
        }, {
            "lat" : 37.775325,
            "lng" : -122.4262355,
            "name" : "Mazzat",
            "address" : "501 Fell Street, San Francisco"
        }
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.773972, lng: -122.431297},
        scrollwheel: true,
        zoom: 16
    });

    places.forEach(function (place) {
        addMarker(place);
    });

    function addMarker(place) {

        var infowindow = new google.maps.InfoWindow({
            content: place.name + '<br>' + place.address
        });

        var marker = new google.maps.Marker({
            position: {lat: place.lat, lng: place.lng},
            map: map,
            title: 'San Francisco'
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    }

function showInfo(place) {
    var infowindow = new google.maps.InfoWindow({
        content: place.name + '<br>' + place.address
    });

    var marker = new google.maps.Marker({
        position: {lat: place.lat, lng: place.lng},
        map: map,
        title: 'San Francisco'
    });

    infowindow.open(map, marker);
}

var viewModel = {
    nearByRestaurants: ko.observableArray(places),
    showInfo: function () {
        showInfo(this);
    }
};

    ko.applyBindings(viewModel);