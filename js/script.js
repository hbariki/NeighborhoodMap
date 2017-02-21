var isMenuVisible = false;
$('#menu').click(function() {
    if(!isMenuVisible) {
        isMenuVisible = true;
        $('#searchSection').removeClass('hide');
        $('#searchSection').addClass('show');
    } else {
        isMenuVisible = false;
        $('#searchSection').removeClass('show');
        $('#searchSection').addClass('hide');
    }
});

var markers = [];
// loads empty marker
var map =  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.773972, lng: -122.431297},
    scrollwheel: true,
    zoom: 11
});

initPlaces()
    .then(function(places) {
        initKo(places)
    })
    .catch(function(errorObj) {
        $('#mapWrapper').hide();
        alert('Sorry! something went wrong');
    });

// used promise to get the information from four square API
function initPlaces() {
    return new Promise(function(resolve, reject) {
        var places = [];
        var url = 'https://api.foursquare.com/v2/venues/search?query=restaurants&ll=37.773972,-122.431297&client_id=PHZBRN5QYY4JI0IKM4PHMTYLOUAUZSBCNT5NSH4TZLTIVP0J&client_secret=H5TYBLH1P2X2NECUHQZSKZTPTCPZMMVXXFVZDKPMOX1HRQAE&v=20170219&limit=25';

        $.ajax({
            type: 'get',
            datatype: 'json',
            url: url,
            success: function(successData) {
                successData.response.venues.forEach(function(venue) {
                    places.push({
                        lat: venue.location.lat,
                        lng: venue.location.lng,
                        name: venue.name,
                        address: venue.location.address
                    });
                });

                resolve(places);
            },
            error: function(jqXHR, message, errorObj) {
                reject(errorObj);
            }
        });
    });
}

// Implemented knockout approach to filtered the places and display the list of items
function initKo(places) {
    var viewModel = {
        filter: ko.observable(''),
        nearByRestaurants: ko.observableArray(places),
        showInfo: function () {
            showInfo(this);
        }
    };

    viewModel.filteredItems = ko.computed(function() {
        var filter = this.filter().toLowerCase();
        if (!filter) {
            var nearByRestaurants = this.nearByRestaurants();
            nearByRestaurants.forEach(function (place) {
                addMarker(place);
            });
            return nearByRestaurants;
        } else {
            var filteredRestaurants = ko.utils.arrayFilter(this.nearByRestaurants(), function(item) {
                return stringStartsWith(item.name.toLowerCase(), filter);
            });

            // remove all markers
            markers.forEach(function(marker) {
                marker.setMap(null);
            });

            filteredRestaurants.forEach(function (place) {
                addMarker(place);
            });

            return filteredRestaurants;
        }
    }, viewModel);

    ko.applyBindings(viewModel);
}

//  adds marker
function addMarker(place) {

    var infowindow = new google.maps.InfoWindow({
        content: place.name + '<br>' + place.address
    });

    var marker = new google.maps.Marker({
        position: {lat: place.lat, lng: place.lng},
        map: map,
        title: 'San Francisco'
    });

    markers.push(marker);
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}

// displays the info window
function showInfo(place) {
    var infowindow = new google.maps.InfoWindow({
        content: place.name + '<br>' + place.address
    });

    var marker = new google.maps.Marker({
        position: {lat: place.lat, lng: place.lng},
        map: map,
        title: 'San Francisco'
    });

    marker.setAnimation(google.maps.Animation.BOUNCE);

    // stop bounce animation after a second
    setTimeout(function(){ marker.setAnimation(null); }, 1000);

    infowindow.open(map, marker);
}

// checks string that matches to the enteres string
var stringStartsWith = function (string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
};