(function(angular) {
  'use strict';
angular.module('maps', ['wimoApp']).controller('mapsCtrl',['$http', 'UserService', function MainCtrl($http, UserService) {

    var ctrl = this;
    var map;
    
    var myLatLng = { lat: 25.194594, lng: 55.274034};
    var myLatLng1 = { lat: 25.089483, lng: 55.189321 }; 

    if(UserService.getJson()){
        myLatLng = { lat:UserService.getJson().from.lat, lng: UserService.getJson().from.lng};
        myLatLng1 = { lat: UserService.getJson().from.lat, lng: UserService.getJson().from.lng }; 
    }
    
    

    // waiting maps to load first
    setTimeout(()=> {

        initMap();

    }, 1000);
    
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 12
        });

        map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng1,
        zoom: 11
        });


        var pathBetween = new google.maps.Polyline({
        path: [myLatLng,myLatLng1],
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
        });

        pathBetween.setMap(map);


        var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Source',
        animation: google.maps.Animation.DROP,

        });

        var marker = new google.maps.Marker({
            position: myLatLng1,
            map: map,
            title: 'Destination',
            animation: google.maps.Animation.DROP,
        });
    }

}]);

})(window.angular);