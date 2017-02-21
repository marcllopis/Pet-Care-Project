function init() {

var input = document.getElementById('searchTextField');
var autocomplete = new google.maps.places.Autocomplete(input);

}

var lati = 0;
var longi = 0;

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



    var longi = $("#long").val()
    var lati = $("#lat").val()

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
