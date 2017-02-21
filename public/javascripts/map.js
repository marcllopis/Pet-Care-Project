
function initAutocomplete() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: Number(loc.lat), lng: Number(loc.lng)},
        zoom: 10,
        mapTypeId: 'roadmap'

      });
console.log("COORDINATES");
console.log(loc.lat);
      console.log(loc.lng);




      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
        // console.log(input);
      // console.log(searchBox);
      // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });
      // console.log(myTakers);

      let markers = [];

      $.ajax({
        url: "http://localhost:3000/search/json",
        type: "get",
        success: function(response){
          console.log(response);

          response.forEach(function(response){
            if (response.role === "PETTAKER") {
              let title = response.name
              let position = {
                lat: response.location.lat,
                lng: response.location.long
              };
              var pin = new google.maps.Marker({ position, map, title  });
              markers.push(pin)
            }
          });

          console.log(response)
        },
        error: function(error){console.log(error)}
      })



      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        console.log(places[0].geometry.location.lat())
        console.log(places[0].geometry.location.lng())
        if (places.length == 0) {
          return;
        }


        $.ajax({
          url: "http://localhost:3000/search/json",
          type: "get",
          success: function(response){
            response.forEach(function(response){
              let title = response.name
              let position = {
                lat: response.location.lat,
                lng: response.location.long
              };
              var pin = new google.maps.Marker({ position, map, title  });
              markers.push(pin)

            });

          },
          error: function(error){console.log(error)}
        })


map.addListener('dragend', function() { console.log(map.center.lat(),map.center.lng())
$('#lat2').val(map.center.lat());
$('#lng2').val(map.center.lng());
})

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


          // myPlaces.forEach(function(place){
          //     let title = place.name;
          //     let position = {
          //       lat: place.location.coordinates[1],
          //       lng: place.location.coordinates[0]
          //     };
          //
          //     var pin = new google.maps.Marker({ position, map, title  });
          //     if(place.name === "Coffee") {pin.setIcon('https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png')}
          //     else if (place.name === "books") {markers.push(pin)}
          //   });

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }
