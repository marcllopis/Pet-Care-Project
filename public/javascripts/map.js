
function initAutocomplete() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: Number(loc.lat), lng: Number(loc.lng)},
        zoom: 12,
        mapTypeId: 'roadmap'

      });


      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);


      // Bias the SearchBox results towards current map's viewport.


$('#pac-input').change(function() {
  window.location.href = "http://localhost:3000/search?lat=" + map.center.lat() + "&long=" + map.center.lng();

});
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });


      map.addListener('dragend', function() {

      window.location.href = "http://localhost:3000/search?lat=" + map.center.lat() + "&long=" + map.center.lng();

      })


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
              markers.push(pin)
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




    function init() {

    var input = document.getElementById('pac-input');
    var autocomplete = new google.maps.places.Autocomplete(input);

    }



    $('#pac-input').change(function() {

      var service = new google.maps.places.PlacesService(document.createElement("div"));

      var request = {
        location: {lat: 0, lng: 0},
        radius: "500",
        query: $("#pac-input").val()
      };

      service.textSearch(request, function(places){
        const lat = places[0].geometry.location.lat();
        const long = places[0].geometry.location.lng();

        $("#lat").val(lat);
        $("#long").val(long);



      });
    });



    $("#goMap").click(function(){
      if ($("#lat").val() !== "" && $("#long").val() !== "") {
        $(this).find("a").attr("href", "/search?lat=" + $("#lat").val() + "&long=" + $("#long").val())
      }
    })




    $(document).ready(function(){
      init();
    })
