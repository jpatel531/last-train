angular.module('starter').controller('TestCtrl', function($scope, $http){

	$scope.findJourneys = function(){
	    $http.post('http://localhost:3000/journeys', {from: $scope.fromLocation, to: $scope.toLocation}).success(function(data){
	      $scope.lastJourneys = data;

	    })

	};


}).controller('JourneyInstanceCtrl', function($scope, $http){

		$scope.whenSend = "now";

  	$scope.selectJourney = function(journey){
      $scope.selectedJourney = journey;
      $scope.instructions = journey.fullInstructions.join(". ")
  	};


  	$scope.sendToTwilio = function(){
	    data = {phone_number: $scope.phoneNumber, instructions: $scope.instructions, departure_time: $scope.selectedJourney.startDateTime, when_send: $scope.whenSend }
	    $http.post('http://localhost:3000/texts', data).success(function(data){
	    	$scope.success = data;
	    });
  	}



});