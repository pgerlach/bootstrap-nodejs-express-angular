/*
 * used to activate the correct tab in the upper navigation bar depending on the url
 */
(function(window, angular, undefined) {
  angular
  .module('myApp')
  .controller(
    'navCtrl', ['$rootScope', '$location', function($rootScope, $location) {

      var self = this;

      self.currentPath = '';

      // update currentPath at each page change
      $rootScope.$on('$locationChangeSuccess', function() {
        self.currentPath = $location.path();
      });

    }]
  );
}(window, angular));