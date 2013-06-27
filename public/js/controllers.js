'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('DashboardCtrl', function ($scope, socket) {
    $scope.msg = ":(";
    socket.on('bc:msg', function (data) {
      $scope.msg = data.msg;
    });
  }).
  controller('RemoteCtrl', function ($scope, socket) {
    socket.on('bc:msg', function (data) {
      $scope.alerts = data.msg;
    });
    $scope.send = function() {
      console.log($scope.message);
      socket.emit('msg:send', {
        msg: $scope.message
      });
    }
  });
