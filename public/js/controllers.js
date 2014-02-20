'use strict';

/* Controllers */

angular.module('myApp.controllers', []).

  controller('AppCtrl', function ($scope, socket) {
    $scope.messages = [];
    $scope.sel = 0;
    $scope.objects = [{name:"a"},{name:"b"},{name:"c"},];
    $scope.oc = 0;

    var append = function(data) {
      if (!data.type) data.type = ' panel-default';
      else data.type = ' panel-' + data.type;
      $scope.messages.unshift(data);
    };

    // refresh all messages
    socket.on('bc:msgs', function (data) {
      $scope.messages = [];
      if (data && data.length) {
        data.forEach(function(msg) {
          append(msg);
        });
      }
    });

    // listen on single messages
    socket.on('bc:msg', function (data) {
      append(data);
    });

  }).

  controller('FooterCtrl', function ($scope, socket) {
    $scope.msg = {};

    // send msg
    $scope.send = function() {
      socket.emit('msg:send', $scope.msg);
    }

  });
