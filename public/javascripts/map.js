function initAutocomplete() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        scrollwheel: false

      });

      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }


        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };


          myPlaces.forEach(function(place){
              let title = place.name;
              let position = {
                lat: place.location.coordinates[1],
                lng: place.location.coordinates[0]
              };

              var pin = new google.maps.Marker({ position, map, title  });
              if(place.name === "Coffee") {pin.setIcon('https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png')}
              else if (place.name === "books") {markers.push(pin)}
            });

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {89
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }
