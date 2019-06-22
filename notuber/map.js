// Katelyn Eustace
// COMP20 2019
// June 19th, 2019

var map;
var http = new XMLHttpRequest();
var url = 'https://hans-moleman.herokuapp.com/rides';
var username = 'Nu1F3c79';
var markers = [];
var latitude = 42.352271;
var longitude = -71.05524200000001;

// place the cars using the JSON data recieved from the server
function placeCars(jsonData){
        var i;
        var car;
        var cars = JSON.parse(jsonData);
        var my_pos = new google.maps.LatLng(latitude, longitude);
        for (i = 0; i < cars.length; i++)
        {
                car = cars[i];
                var car_pos = new google.maps.LatLng(car['lat'], car['lng']);
                var marker = new google.maps.Marker({
                        position: {lat: car['lat'], lng: car['lng']},
                        map: map,
                        icon: 'images/car.png',
                        id: car['id'],
                        username: car['username'],
                });

                marker.addListener('click', function() {
                        alert(this.username);
                });
                markers.push(marker);
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
                    placeCars(this.responseText);
            }
        }
        http.send(params);
}

function currentPosition()
{
        // watchPosition enables the location to update as the user moves
        if (navigator.geolocation)
        {
                navigator.geolocation.watchPosition(setPosition);
        }
}

function setPosition (position)
{
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var pos = {lat: latitude, lng: longitude};
        map.setCenter(pos);
        var marker = new google.maps.Marker({position: pos, map: map});
}

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: 42.352271, lng: -71.05524200000001},
                        zoom: 14
        });
        currentPosition();
        sendRequest();

        // // moves the markers around the map
        // setInterval(function(){
        //         var i;
        //         for (i = 0; i < markers.length; i++)
        //         {
        //
        //         }
        // }, 3000);
}
