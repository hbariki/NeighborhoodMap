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

var map;
var infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.773972, lng: -122.431297},
        scrollwheel: true,
        zoom: 11
    });

    infoWindow = new google.maps.InfoWindow({
        content: ''
    });
}

function googleError() {
    console.log("error,something went wrong")
}

var markers = [];
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
                var counter = 1;
                successData.response.venues.forEach(function(venue) {
                    places.push({
                        lat: venue.location.lat,
                        lng: venue.location.lng,
                        name: venue.name,
                        address: venue.location.address ? venue.location.address : 'No address available',
                        id: counter
                    });
                    counter++;
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
            var restaurantMarker = markers[this.id - 1];
            google.maps.event.trigger(restaurantMarker.marker, 'click');
        }
    };

    viewModel.filteredItems = ko.computed(function() {
        var filter = this.filter().toLowerCase();
        if (!filter) {
            var nearByRestaurants = this.nearByRestaurants();
            if(markers.length === 0) {
                nearByRestaurants.forEach(function (place) {
                    addMarker(place);
                });
            }else {
                markers.forEach(function(restaurantMarker){
                    restaurantMarker.marker.setVisible(true);
                })
            }
            return nearByRestaurants;
        } else {
            var filteredRestaurants = ko.utils.arrayFilter(this.nearByRestaurants(), function(restaurant) {
                return restaurant.name.toLowerCase().indexOf(filter) !== -1;
            });

            markers.forEach(function(restaurantMarker) {
                var isRestaurantFiltered = false;
                filteredRestaurants.forEach(function(filteredRestaurant) {
                   if(restaurantMarker.place === filteredRestaurant) {
                       isRestaurantFiltered = true;
                   }
                });

                if(isRestaurantFiltered) {
                    restaurantMarker.marker.setVisible(true);
                } else {
                    restaurantMarker.marker.setVisible(false);
                }
            });

            return filteredRestaurants;
        }
    }, viewModel);

    ko.applyBindings(viewModel);
}

//  adds marker
function addMarker(place) {
    var marker = new google.maps.Marker({
        position: {lat: place.lat, lng: place.lng},
        map: map,
        title: 'San Francisco'
    });

    markers.push({
        marker: marker,
        place: place
    });

    marker.addListener('click', function () {
        window.setTimeout(function () {
            map.panTo(marker.getPosition());
        }, 3000);

        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 1400);

        infoWindow.setContent(place.name + '<br>' + place.address);
        infoWindow.open(map, marker);
    });
}