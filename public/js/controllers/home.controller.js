(function() {
  'use strict';

  angular.module('trainerWeb')
  .controller('HomeCtrl', ['$rootScope', '$http', 'Socket',
    function($rootScope, $http, Socket) {
      var vm = this;

      // $rootScope.pageTitle = 'Home';

      vm.message = 'Home controller checking in';

    }
  ]);
})();
