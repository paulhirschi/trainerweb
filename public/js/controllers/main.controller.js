(function() {
  'use strict';

  angular.module('trainerWeb')
    .controller('MainCtrl', ['$rootScope', '$state', '$window', 'Auth', 'Socket',
      function($rootScope, $state, $window, Auth, Socket) {
        var vm = this;

        vm.logoutUser = function() {
          Auth.logout();
          $state.go('login');
        };

        vm.state = $state;
        vm.navigation = [
          {state: 'main.dashboard', label: 'Dashboard'},
          {state: 'main.notifications', label: 'Notifications'},
          {state: 'main.settings', label: 'Settings'},
          {state: 'main.help', label: 'Help'}
        ];

        // Socket.on('user_connected', function(user) {
        //   console.log('user connected ', user);
        // });
      }
    ]);
})();
