var app = angular.module('app', []);


app.controller('AppCtrl', ['$scope', '$http', function($scope, $http){

	var map = new GMaps({
		div: '#map',
		lat: -12.043333,
		lng: -77.028333
	});


	$scope.getLocation = function(){
			NProgress.start();
			GMaps.geolocate({
			  success: function(position) {
			    map.setCenter(position.coords.latitude, position.coords.longitude);
			    $scope.latitude = position.coords.latitude;
			    $scope.longitude = position.coords.longitude;
			    $scope.$apply(function(){
				    $scope.fromLocation = $scope.longitude + "," + $scope.latitude 
				    NProgress.done();
			    })
					console.log($scope.fromLocation)
			  },
			  error: function(error) {
			    	console.log('Geolocation failed: '+error.message);
			  },
			  not_supported: function() {
			    console.log("Your browser does not support geolocation");
			  },
			  always: function() {
			    console.log("Done!");
			  }
		});
	};

  $scope.findJourneys = function(){
    NProgress.start();
    $http.post('/journeys', {from: $scope.fromLocation, to: $scope.toLocation}).success(function(data){
      $scope.lastJourneys = data;

      map.setCenter($scope.lastJourneys[0].mapPath[0][0], $scope.lastJourneys[0].mapPath[0][1]);

      map.drawPolyline({
        path: $scope.lastJourneys[0].mapPath,
        strokeColor: '#131540',
        strokeOpacity: 0.6,
        strokeWeight: 6
      });      

      $scope.showMap = true;
      NProgress.done();
    })
  }




}]).controller('JourneyInstanceCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){

  $scope.selectJourney = function(journey){
      $scope.showOptions = true;
      $scope.selectedJourney = journey;
      $scope.instructions = journey.fullInstructions.join(". ")
  };


  $scope.sendToTwilio = function(){
    data = {phone_number: $scope.phoneNumber, instructions: $scope.instructions, departure_time: $scope.selectedJourney.startDateTime, when_send: $scope.whenSend }
    $http.post('/texts', data).success(function(data){
    	$scope.success = data;
    });

  }


}])

