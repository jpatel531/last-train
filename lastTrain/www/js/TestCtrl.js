angular.module('starter').controller('TestCtrl', function($scope, $http){

    $http.post('http://localhost:3000/journeys', {from: "tw14 9nt", to: "tw14 8ex"}).success(function(data){
      $scope.lastJourneys = data;

    
    })





});