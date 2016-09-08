(function() {
  'use strict';

  angular.module('trainerWeb').controller('SettingsCtrl', ['$rootScope', '$scope',
    function($rootScope, $scope) {
      var vm = this;

      $rootScope.pageTitle = 'Settings';

      vm.message = 'Settings controller checking in';
    }

  ]);
})();
