(function(window, angular, undefined) {
  'use strict';

  angular.module('myApp', ['ngRoute', 'ngWebSocket'])

  .config(function($routeProvider) {

    $routeProvider
      .when('/home', {
        templateUrl: '/app/pages/home/home.html',
        controller: 'homeCtrl',
        controllerAs: 'ctrl'
      })
      .when('/about', {
        templateUrl: '/app/pages/about/about.html',
        controller: 'aboutCtrl',
        controllerAs: 'ctrl'
      })
      .when('/websocket', {
        templateUrl: '/app/pages/websocket/websocket.html',
        controller: 'websocketCtrl',
        controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });

}(window, angular));