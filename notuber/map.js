// username is Nu1F3c79
var map;
var http = new XMLHttpRequest();
var url = 'https://hans-moleman.herokuapp.com/rides';
username = 'Nu1F3c79';
locations = [{lat: 42.3453, lng: -71.0464},
                {lat: 42.3662, lng: -71.0621},
                {lat: 42.3603, lng: -71.0547},
                {lat: 42.3472, lng: -71.0802},
                {lat: 42.3663, lng: -71.0544},
                {lat: 42.3542, lng: -71.0704}]

function placeCars(){
        var i;
        for (i = 0; i < locations.length; i++)
        {
                var marker = new google.maps.Marker({position: locations[i], map: map, icon: 'images/car.png'});
        }
}

function sendRequest(lat, long){
        var params = "username=" + username + "&lat=" + lat + "&lng=" + long;
        http.open('POST', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                console.log(this.responseText);
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
        placeCars();
        currentPosition();
}
