function init() {

var input = document.getElementById('searchTextField');
var autocomplete = new google.maps.places.Autocomplete(input);

}



$('#searchTextField').change(function() {

  var service = new google.maps.places.PlacesService(document.createElement("div"));

  var request = {
    location: {lat: 0, lng: 0},
    radius: "500",
    query: $("#searchTextField").val()
  };

  service.textSearch(request, function(places){
    const lat = places[0].geometry.location.lat();
    const long = places[0].geometry.location.lng();

    $("#lat").val(lat);
    $("#long").val(long);

  });
});

$(document).ready(function(){
  init();
})
