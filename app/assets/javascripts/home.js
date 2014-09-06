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
    var fromLocation = $scope.fromLocation.replace(" ", "+");
    var toLocation = $scope.toLocation.replace(" ", "+");

    $http.get("http://api.tfl.gov.uk/Journey/JourneyResults/%7Bfrom%7D/to/%7Bto%7D/via/%7Bvia%7D?from=" + fromLocation + "&to=" + toLocation + "&via=&nationalSearch=False&date=&time=&timeIs=Departing&journeyPreference=&mode=&accessibilityPreference=&fromName=&toName=&viaName=&maxTransferMinutes=&maxWalkingMinutes=&walkingSpeed=&cyclePreference=&adjustment=&bikeProficiency=&alternativeCycle=False&alternativeWalking=True&applyHtmlMarkup=False&app_id=a09e631e&app_key=c381b49216f90558cf148c53cd5205b8").success(function(data){
      $scope.journeys = data;
    }).then(function(){
      $http.get("http://api.tfl.gov.uk"  + $scope.journeys.searchCriteria.timeAdjustments.latest.uri).success(function(data){
        $scope.lastJourneys = data;
        NProgress.done();
      })
    })


  };





}]).controller('JourneyInstanceCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){

  $scope.selectJourney = function(journey){
      $scope.showOptions = true;
      $scope.selectedJourney = journey;
      $scope.getInstructions()
  };

  $scope.getInstructions = function(){
    var listOfInstructions = []
    _.each($scope.selectedJourney.legs, function(leg){
      if(leg.instruction.steps.length > 0){
        _.each(leg.instruction.steps, function(step){
          listOfInstructions.push(step.description)
        })
      } else {
        listOfInstructions.push(leg.instruction.summary + "/" + leg.instruction.detailed)
      }
    })
    $scope.instructions = listOfInstructions.join(". ");
  }


  $scope.sendToTwilio = function(){
    data = {phone_number: $scope.phoneNumber, instructions: $scope.instructions, departure_time: $scope.selectedJourney.startDateTime, when_send: $scope.whenSend }
    $http.post('/texts', data).success(function(data){
    	$scope.success = data;
    });

  }


}])

