(function(window, angular, undefined) {
  angular
  .module('myApp')
  .controller(
    'homeCtrl', [function() {

        var self = this;

        self.counter = 42;

        self.increaseCounter = function() {
          self.counter++;
        }

        self.decreaseCounter = function() {
          self.counter--;
        }

    }]
  );
}(window, angular));