(function(angular) {
  'use strict';
var app = angular.module('wimoApp', []);
app.controller('tableCtrl', function MainCtrl($http, $window, detail) {

  var ctrl = this;

  ctrl.data = {};
  ctrl.courriers = [];
  ctrl.drivers = [];
  ctrl.statuses = [];

  ctrl.status = "";
  ctrl.tableFilter = "";

  // get intial table data
  getTableData();

  function getTableData(){
    $http({
        url: "/data",
        method: "GET",
      }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            ctrl.data = response.data;
            
            // add filters options data
            for(var obj in ctrl.data){

              if(!ctrl.drivers.includes(ctrl.data[obj].driverName)){
                ctrl.drivers.push(ctrl.data[obj].driverName);
              }

              if(!ctrl.courriers.includes(ctrl.data[obj].courier)){
                ctrl.courriers.push(ctrl.data[obj].courier);
              }

              if(!ctrl.statuses.includes(ctrl.data[obj].status)){
                ctrl.statuses.push(ctrl.data[obj].status);
              }
            }

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            this.error = response.statusText;
      });
  }

   ctrl.getFilteredTableData = (type) => {

     var filters = {"type" : type, "value": ctrl.tableFilter};

      $http({
          url: "/getFilteredData",
          method: "POST",
          data: filters
        }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              ctrl.data = response.data;

          }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              this.error = response.statusText;
        });
  }
  

  ctrl.updateRow = (taskId) => {

    var filters = {"id" : taskId, "status": ctrl.status};

      $http({
        url: "/updateTask",
        method: "POST",
        data: filters
      }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            getTableData();
            ctrl.status = "";

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            this.error = response.statusText;
      });
  } 

  ctrl.showMap = (fromLoc, toLoc) => {

    var filters = {"from" : fromLoc, "to": toLoc};
    detail.setdetails(filters); 
    $window.location.href = '/test_maps.html';
     

  }

});
    app.service('detail', function() {

      this.v = {};
      return {
        setdetails: function(value) {
          this.v = value;
        },
        getdetails: function(){
          return this.v;
        }
      };
    });
})(window.angular);