'use strict';

/* Controllers */

angular.module('myApp.controllers', []).

  controller('AppCtrl', function ($scope, socket) {
    $scope.messages = [];
    var accordion = angular.element(document.getElementById('accordion'));
    var count = 0;

    var append = function(data) {
      data['i'] = count++;
      $scope.messages.unshift(data);
    };

    socket.on('bc:msg', function (data) {
      append(data);
    });

    $scope.msg = {};
    $scope.send = function() {
      socket.emit('msg:send', $scope.msg);
    }
  });
