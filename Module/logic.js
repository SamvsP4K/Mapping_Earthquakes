// Add console.log to check to see if our code is working.
console.log("working");

//Create map object
let map = L.map('mapid').setView([30, 30],2);

//coordinates to be used for line
let line = [
    [33.9416, -118.4085],
    [37.6214, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
  ];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line,{
    color:"yellow"
}).addTo(map);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"14",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

//Adding a GeoJSON layer to map
//L.geoJSON(sanFranAirport,{
    //turning features into markers on map
    //pointToLayer:function(feature,latlng){
        //console.log(feature);
        //return L.marker(latlng)
        //.bindPopup("<h2>" + feature.properties.name + "</h2><hr>" + feature.properties.city + ","+ feature.properties.country + "</h3>")
    //}
//}).addTo(map);
L.geoJSON(sanFranAirport,{
    onEachFeature: function(feature,layer){
        console.log(layer);
        layer.bindPopup("<h2> Airport Code:" + feature.properties.faa + "</h2><hr>"+"<h2 Airport Name>" + feature.properties.name + "</h3>");
        return L.marker(layer)
     
    }
}).addTo(map)


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//loading external airport data
let airportData = "https://raw.githubusercontent.com/SamvsP4K/Mapping_Earthquakes/main/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});


// Get data from cities.js
let cityData = cities;

  // Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city),
    L.circleMarker(city.location,{
        radius: city.population/200000,
        color: "orange"
    })
    .bindPopup("<h2>" + city.city +"," + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map)
   });




// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

