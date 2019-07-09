// Katelyn Eustace
// COMP20 2019
// June 19th, 2019

var map;
var latIndex = 1;
var lngIndex = 2;
var idIndex = 3;
var usernameIndex = 4;
var conversionFactor = .000621371;
var cars = [];
var pathCoordinates = {lat: 0, lng: 0};
var latitude = 42.352271;
var longitude = -71.05524200000001;
var content;
var shortestDistance;
var http = new XMLHttpRequest();
var username = 'Nu1F3c79';
var url = 'https://peaceful-cuyahoga-valley-68827.herokuapp.com/rides';

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: 42.352271, lng: -71.05524200000001},
                        zoom: 14
        });
        sendRequest();
}

function currentPosition()
{
        // watchPosition enables the location to update as the user moves
        if (navigator.geolocation)
        {
                navigator.geolocation.watchPosition(function(setPosition) {
                        latitude = position.coords.latitude;
                        longitude = position.coords.longitude;
                        var pos = {lat: latitude, lng: longitude};
                        map.setCenter(pos);
                        var marker = new google.maps.Marker({position: pos, map: map});
                });
        }
        else {
                alert("Error: cannot access location");
        }
}

// place the cars using the JSON data recieved from the server
function sendRequest(){
        var params = "username=" + username + "&lat=" + latitude + "&lng=" + longitude;
        http.open('POST', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                   var jsonData = this.responseText;
                   var carData = JSON.parse(jsonData);
                   var carLat, carLng, carID, carUsername;
                   for (var i = 0; i < carData.length; i++)
                   {
                           var car = carData[i];
                           carLat = car['lat'];
                           carLng = car['lng'];
                           carID = car['id'];
                           carUsername = car['username'];
                           cars.push([carLat, carLng, carID, carUsername, i]);
                           shortest = findPath(i, car);
                   }
                   currentPosition();
                   setMarkers();
                   setPath();
            }
        }
        http.send(params);
}

function setPath()
{

}

function setMarkers() {
        for (var i = 0; i++; i < cars.length)
        {
                car = cars[i];
                var carContent = "ID: " + car[idIndex] + "\n"
                        + "username: " + car[usernameIndex] + "\n"
                        + "location: " + car[latIndex] + ", " + car[lngIndex];
                var car_pos = new google.maps.LatLng(car[latIndex], car[lngIndex]);
                var marker = new google.maps.Marker({
                        position: {lat: car[latIndex], lng: car[lngIndex]},
                        map: map,
                        icon: 'images/car.png',
                        id: car[idIndex],
                        username: car[usernameIndex],
                        content: carContent
                });

                var infoWindow = new google.maps.infoWindow();
                marker.addListener('click', function() {
                        infoWindow.setContent(carContent);
                        infoWindow.open(map, marker);
                });
        }
}

function findPath(i, car)
{
        car = cars[i];
        distance = computeDistance(car);
        if (distance < shortestDistance)
        {
                shortestDistance = distance;
                pathCoordinates= {lat: car[latIndex], lng: car[lngIndex]};
        }
}

function computeDistance(car)
{
        var pointA = new google.maps.LatLng(car[latIndex], car[lngIndex]);
        var pointB = new google.maps.LatLng(latitude, longitude);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB);
        distance = distance * conversionFactor;
        return distance;
}
