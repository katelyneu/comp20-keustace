// Katelyn Eustace
// COMP20 2019
// June 19th, 2019

var map;
var http = new XMLHttpRequest();
var url = 'https://hans-moleman.herokuapp.com/rides';
var username = 'Nu1F3c79';

// place the cars using the JSON data recieved from the server
function placeCars(jsonData){
        var i;
        var car;
        var cars = JSON.parse(jsonData);
        for (i = 0; i < cars.length; i++)
        {
                car = cars[i];
                var marker = new google.maps.Marker({
                        position: {lat: car['lat'], lng: car['lng']},
                        map: map,
                        icon: 'images/car.png',
                        id: car['id'],
                        username: car['username']
                });

                marker.addListener('click', function() {
                        alert(this.username);
                });
        }
}

// place the cars using the JSON data recieved from the server
function sendRequest(lat, long){
        var params = "username=" + username + "&lat=" + lat + "&lng=" + long;
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
                navigator.geolocation.watchPosition(showPosition);
        }
}

function showPosition (position)
{
        var pos = {lat: position.coords.latitude, lng: position.coords.longitude};
        map.setCenter(pos);
        var marker = new google.maps.Marker({position: pos, map: map});
        sendRequest(position.coords.latitude, position.coords.longitude);
}

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: 42.352271, lng: -71.05524200000001},
                        zoom: 14
        });
        currentPosition();
}
