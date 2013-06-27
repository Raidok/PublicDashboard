'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  
  // 3rd party dependencies
  'btford.socket-io'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/dash', {
      templateUrl: 'partials/dash',
      controller: 'DashboardCtrl'
    }).
    when('/remote', {
      templateUrl: 'partials/remote',
      controller: 'RemoteCtrl'
    }).
    otherwise({
      redirectTo: '/dash'
    });

  $locationProvider.html5Mode(true);
});
