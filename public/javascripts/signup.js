<<<<<<< HEAD
function initialize() {

var input = document.getElementById('searchTextField');
console.log(input.value);
=======
function init() {

var input = document.getElementById('searchTextField');
>>>>>>> master
var autocomplete = new google.maps.places.Autocomplete(input);

}


<<<<<<< HEAD

google.maps.event.addDomListener(window, 'load', initialize);



function initMap() {
       var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 8,
         center: {lat: -34.397, lng: 150.644}
       });
       var geocoder = new google.maps.Geocoder();

       document.getElementById('submit').addEventListener('click', function() {
         geocodeAddress(geocoder, map);
       });
     }

     function geocodeAddress(geocoder, resultsMap) {
       var address = document.getElementById('address').value;
       geocoder.geocode({'address': address}, function(results, status) {
         if (status === 'OK') {
           resultsMap.setCenter(results[0].geometry.location);
           var marker = new google.maps.Marker({
             map: resultsMap,
             position: results[0].geometry.location
           });
         } else {
           alert('Geocode was not successful for the following reason: ' + status);
         }
       });
     }
=======
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
>>>>>>> master
