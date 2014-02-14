'use strict';

/* Directives */

angular.module('myApp.directives', [])

.directive('appVersion', function (version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
})

.directive('message', function($compile) {
	return {
		restrict: 'EA',
		transclude: false,
		replace: true,
		templateUrl: 'partials/message',
		scope: {
			data: '='
		}
	}
});
