'use strict';
angular.module('IonicTut.controllers', [])

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };
  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

.controller('MainCtrl', function($scope, $state, $http, $q) {
  
  $scope.init = function() {
    $scope.getImages().then(function(res) {
      // Success
      console.log(res);
    }, function(status) {
      console.log(status);
    });
  }

  $scope.getImages = function() {
    var defer = $q.defer();

    $http.jsonp('https://api.dribbble.com/v1/users/simplebits')
      .success(function(res) {
        defer.resolve(res);
      })
      .error(function(status, err) {
        console.log(status);
        console.log(err);
        
        defer.reject(status);
      });
    return defer.promise;
  }

  $scope.init();

});
