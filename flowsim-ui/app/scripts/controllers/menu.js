'use strict';

/**
 * @ngdoc function
 * @name flowsimUiApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the flowsimUiApp
 */
angular.module('flowsimUiApp')
  .controller('MenuCtrl', function ($scope, $rootScope, Subscriber) {
    $scope.authenticated = true;

    $rootScope.$on('subscriberAuth', function() {
      console.log('auth');
      $scope.authenticated = true;
    });

    $rootScope.$on('subscriberDeauth', function() {
      console.log('deauth');
      $scope.authenticated = false;
    });

    $scope.logout = function() {
      $scope.authenticated = false;
      Subscriber.logout(function(err) {
        if(err) {
          console.log(err.details);
        }
      });
    };
  });
