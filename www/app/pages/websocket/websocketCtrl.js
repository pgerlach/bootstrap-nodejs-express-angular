(function(window, angular, undefined) {
  angular
  .module('myApp')
  .controller(
    'websocketCtrl', ['$websocket', '$scope', function($websocket, $scope) {
      var self = this;

      self.text = "youpi";
      self.lastMessageReceived = "";

      var dataStream = $websocket('ws://localhost:5000/echo');

      // copy received message to the interface
      dataStream.onMessage(function(message) {
        self.lastMessageReceived = message.data;
      });

      dataStream.onClose(function(message) {
        console.log("WS: onClose", message);
      });

      // sends the current text through the websocket
      self.sendText = function() {
        dataStream.send(self.text);
      }

      // close websocket when moving to another view
      $scope.$on("$destroy", function handler() {
        dataStream.close();
      });

    }]
  );
}(window, angular));