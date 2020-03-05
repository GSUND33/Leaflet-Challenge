API_KEY = "pk.eyJ1IjoiZzMzNzciLCJhIjoiY2s2MTJ1aXB1MDB2YjNqbmdkNTh3anM1dyJ9.gYAPlUUEiDFSqhYBUPTJKw";

var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create a map object
d3.json(url).then((data) => {
  console.log(data)
  var features = data['features'];
  console.log(features)
  for (var i = 0; i < features.length; i++){
      var magnitude = features[i]['properties']['mag']
      console.log(magnitude)

      var geometry = features[i]['geometry']
      console.log(geometry)
      var coordinates = geometry['coordinates']
      console.log(coordinates)
      var longitude = coordinates[0]
      var latitude = coordinates[1]
      var location = [longitude,latitude]
      console.log(location)

      var color = "";
      if (magnitude > 5) {
          color = '#EA2C2C';
       }
      else if (magnitude > 4) {
        color = "#EA822C";
       }
       else if (magnitude > 3) {
         color = "#EE9C00";
       }
       else if (magnitude > 2) {
          color = "#EECC00";
        }
        else if (magnitude > 1) {
          color = "#D4EE00";
        }
        else {
          color = "#98EE00";
       };

  // Add circles to map
  L.circle(location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust radius
    radius: magnitude*10000
  }).bindPopup("<h1>Location:" + location + "</h1> <hr> <h3>Magnitude: " + magnitude + "</h3>").addTo(myMap);
}
var legend = L.control({position: 'bottomright'});

legend.onAdd = function() {

  var div = L.DomUtil.create('div', 'info legend');
  var grades = [0, 1, 2, 3, 4, 5];
  var colors = [
    "#98EE00",
    "#D4EE00",
    "#EECC00",
    "#EE9C00",
    "#EA822C",
    "#EA2C2C"
  ];
  var labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  };
  return div;
};
legend.addTo(myMap);
});

function getColor(i) {
return i > 5 ? '#F30' :
i > 4  ? '#F60' :
i > 3  ? '#F90' :
i > 2  ? '#FC0' :
i > 1   ? '#FF0' :
          '#9F3';
}