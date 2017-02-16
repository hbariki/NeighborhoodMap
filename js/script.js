
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
          this.name = name;
          this.address = address;
          this.marker = new google.maps.Marker({
              position: {lat: data.latitude, lng: data.longitude},
              map: map,
              title: 'First Marker'
          });
      };

      var viewModel = {

          places: ko.observableArray(places),

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

      viewModel.createPlaces();
      console.log(viewModel.restaurants());

      viewModel.query.subscribe(viewModel.search);

      ko.applyBindings(viewModel);



