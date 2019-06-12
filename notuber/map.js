var map;
locations = [{lat: 42.3453, lng: -71.0464},
                {lat: 42.3662, lng: -71.0621},
                {lat: 42.3603, lng: -71.0547},
                {lat: 42.3472, lng: -71.0802},
                {lat: 42.3663, lng: -71.0544},
                {lat: 42.3542, lng: -71.0704}]
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: 42.352271, lng: -71.05524200000001},
                        zoom: 14
        });
        var i;
        for (i = 0; i < locations.length; i++)
        {
                var marker = new google.maps.Marker({position: locations[i], map: map, icon: 'images/car.png'});
        }
}
