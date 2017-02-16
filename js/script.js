
 // $(function() {
      var places = [
          {
              name: "Dish dash",
              address: "Murphy Ave, Sunnyvale, CA",
              lat: 23.45,
              lng: 45.345,
          },

          {
              name: "Bawarchi",
              address: "ElcaminoReal, Sunnyvale, CA",
              lat: 33.45,
              lng: 45.345,
          },
          {
              name: "kung pao chicken",
              address: "cherry Orchard shopping center, 390W El Camino Real, Sunnyvale, CA",
              lat: 34.45,
              lng: 45.345,
          },

      ];

      var Place = function (data, map) {
          var self = this;
          this.name = data.name;
          this.address = data.address;
          this.marker = new google.maps.Marker({
              position: {lat: data.lat, lng: data.lng},
              map: map,
              title: 'First Marker'
          });

          map.panTo(self.marker.getPosition())

      };

      var viewModel = {

          restaurants: ko.observableArray(places),

          query: ko.observable(''),

          createPlaces: function (map) {
              places.forEach(function (place) {
                  viewModel.restaurants.push(new Place(place, map));
              });
          },

          search: function (value) {
              viewModel.places.removeAll();
              for (var x in places) {
                  if (places[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                      viewModel.places.push(places[x]);
                  }
              }
          }
      };



      viewModel.query.subscribe(viewModel.search);

      ko.applyBindings(viewModel);



