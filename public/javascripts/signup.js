function init() {

var input = document.getElementById('searchTextField');
var autocomplete = new google.maps.places.Autocomplete(input);

}

$("form button").click(function(event){
    var service = new google.maps.places.PlacesService(document.createElement("div"));

  var request = {
    location: {lat: 0, lng: 0},
    radius: "500",
    query: $("#searchTextField").val()
  };

  service.textSearch(request, function(places){
    console.log(places[0]);
    console.log(places[0].geometry.location.lat())
    console.log(places[0].geometry.location.lng())

  });
});




$(document).ready(function(){
  init();
})
