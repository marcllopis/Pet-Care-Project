
function initAutocomplete() {
var infowindow = new google.maps.InfoWindow();

      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: Number(loc.lat), lng: Number(loc.lng)},
        zoom: 10,
        mapTypeId: 'roadmap'

      });

      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
        // console.log(input);
      // console.log(searchBox);
      // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.


// $('#pac-input').change(function() {
//   window.location.href = "http://localhost:3000/search?lat=" + map.center.lat() + "&long=" + map.center.lng();
//
// });
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });
      // console.log(myTakers);

      map.addListener('dragend', function() {
        console.log("test");
      window.location.href = "http://localhost:3000/search?lat=" + map.center.lat() + "&long=" + map.center.lng();

      })

      let markers = [];


      let array = window.location.href.split("/")[3].split("=")
      let location = {
        lat: array[1].split("&")[0],
        lng: array[2]
      }

      $.ajax({
        url: "http://localhost:3000/search/json",
        data: location,
        type: "get",
        success: function(response){
          response.forEach(function(response){
            if (response.role === "PETTAKER") {
              let title = response.name
              let position = {
                lat: response.location.coordinates[0],
                lng: response.location.coordinates[1]
              };
              var pin = new google.maps.Marker({ position, map, title  });
              var contentString = response.name + '\n'  + '$' + response.price + '\n' + response.slogan ;


              google.maps.event.addListener(pin, 'click', function() {
              infowindow.setContent(contentString + '<br>' + '<button><a href="/users/\'' + response._id + '\'">Contact this pet caretaker</a></button>');
                            infowindow.open(map, this);
                });

                                                              // <a href="/search">Check the map!</a>
            // }
                      // var infowindow = new google.maps.InfoWindow({
                      //   content: contentString
                      // });
                      //
                      // pin.addListener('click', function() {
                      //   infowindow.open(map, pin);
                      // });
                      //
                      // infowindow.addListener('click', function(){
                      //       window.location.href = "http://localhost:3000/users/" + response._id;
                      // })


            }
          });
        },
        error: function(error){console.log(error)}
      })



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
