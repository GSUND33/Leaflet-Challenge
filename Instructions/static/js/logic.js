API_KEY = "pk.eyJ1IjoiZzMzNzciLCJhIjoiY2s2MTJ1aXB1MDB2YjNqbmdkNTh3anM1dyJ9.gYAPlUUEiDFSqhYBUPTJKw";


var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
});
  
var myMap = L.map("map",{
  center: [40.7, -94.5],
  zoom: 3
});

streetmap.addTo(myMap);
// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  //createFeatures(data.features);
  console.log(data)
  var circles = getFeatures(data.features)
  for(circle of circles)
  {
    circle.bindPopup("<h1> Magnitude of Earthquake: " + [feature.properties.mag] + "</h1>")
    circle.addTo(myMap)
  }
});


d3.json(queryURLquakes, function(data) {
  loadPlates(data.features);
});

function loadPlates(earthquakeData) {
  d3.json(queryURLplates, function(data) {
      createFeatures(earthquakeData, data.features);
  });    
}

function getFeatures(featureList) {
  circles = []
  for (feature of featureList) {
    circles.push(plotPoint(feature));
  }
  return circles
}

function plotPoint(feature) {
 
  coords = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
  return L.circleMarker(coords, {
    fillOpacity: 1,
    color: getColor(feature.properties.mag),
    fillColor: getColor(feature.properties.mag),
    // Adjust radius
    radius: getRadius(feature.properties.mag),
    //radius: 80000
    stroke: false
  })
}

function getMapCircle(feature){
  var circle = {
    // need to be defined but are same for all
    opacity:1,
    fillOpacity:1,
    color: "#000000",
    stroke: true,
    weight: 0.5,
    // care about these, as they vary
    fillColor: getColor(feature.properties.mag),
    radius: getRadius(feature.properties.mag)
  };
  return circle;
}

function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  } else if (magnitude > 4) {
    return "#f5ac40"
  } else if (magnitude > 3){
    return "#ffd240"
  } else if (magnitude > 2) {
    return "#e9ff40"
  }  else {
      return "#98ee00";
  }
  };

function getRadius(magnitude){
  if(magnitude === 0){
    return 1;
  }
  return magnitude * 4;
}

//I want to locate my lats and longs 

function getCoordinates(eventlist){
  var coordinates = []
  for (event of eventlist) {
    coordinates.push(event.geometry.coordinates)
  }
  console.log (coordinates)
  return coordinates
}


/* 
[
 [346.5754, -26.7, 156],
 [4, 6, 5]
]
*/
//
//Plot the lats and longs onto the map
//create markers that will locate the plots
//bind popups on the markers about the details of the earthquakes

//create layers
//satellite, grayscale etc..
//need to identify fault lines and earthquake zones 





















/*


// Create a map object
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data){

  function styleInfo(feature){
    return{
      opacity:1,
      fillOpacity:1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };

  function getColor(magnitude)
    switch (true){
      case magnitude > 5:
        return "#ea2c2c";



      default:
        return "#98ee00"
    };

  function getRadius(magnitude){
    if(magnitude === 0){
      return 1;
    }
    return magnitude * 4;

  }

function something(data) {
  L.geoJson(data,{

    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng);
    },

    style: styleInfo,

    onEachFeature: function(feature, layer){
      layer.bindPopup("Mag: " + feautres.properties.mag + "Location: " + features.properties.place)
    }
  }).addTo(streetmap);
}
  
  
  
  // Define a markerSize function that will give each city a different radius based on its population
  function markerSize() {
    return mag;
  }
  

  tile.addTo(myMap);
  var markers = L.markerClusterGroup();

  var new_data = [];
  for (const [key, value] of Object.entries(data['Feature'])) {
    var temp = {};
    temp['Magnitude of Earthquake'] = data['mag'][key];
    temp['coordinates'] = [data['Latitude'][key], data['Longitude'][key]];
    temp['Latitude'] = data['Latitude'][key];
    temp['Longitude'] = data['Longitude'][key];
    temp['Place of Earthquake'] = String(data['place'][key]);
    temp['Type of Magnitude'] = String(data['magType'][key]);
    temp['Type'] = String(data['type'][key]);
    new_data.push(temp);
    //var message = "<p>:Magnitude of Earthquake " + temp['Magnitude of Earthquake'][key] + "</p><p>Place of Earthquake: " + temp['Place of Earthquake'] + "</p><p>Type of Magnitude: " + temp['magType'];
    //markers.addLayer(L.marker(temp["Coordinates"]).bindPopup(message)).addTo(myMap);
  }


  
  // Loop through the cities array and create one marker for each location object
  for (var i = 0; i < new_data.length; i++) {
    L.circle(new_data[i].coordinates, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
      markers.addLayer(L.marker(temp["coordinates"]).bindPopup(message)).addTo(myMap),
      var message = "<p>Magnitude of Earthquake " + temp['Magnitude of Earthquake'][key] + "</p><p>Place of Earthquake: " + temp['Place of Earthquake'] + "</p><p>Type of Magnitude: " + temp['magType']
        }

  //Setting our circle's radius equal to the output of our markerSize function
  //This will make our marker's size proportionate to its population
      //radius: markerSize(new_data[i]["Magnitude of Earthquake"])
  //}).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
  //}
  */