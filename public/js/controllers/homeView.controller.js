(function() {
  'use strict';

  angular.module('trainerWeb')
    .controller('HomeViewCtrl', ['$rootScope', '$state', '$window', 'Auth', 'Socket',
      function($rootScope, $state, $window, Auth, Socket) {
        var vm = this;

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if(toState.name === 'homeView.home') {
            $rootScope.pageTitle = 'Trainer App';
          }else if(toState.name === 'homeView.about') {
            $rootScope.pageTitle = 'About';
          } else if(toState.name === 'homeView.services') {
            $rootScope.pageTitle = 'Services';
          } else if(toState.name === 'homeView.contact') {
            $rootScope.pageTitle = 'Contact';
          } else if(toState.name === 'homeView.blog') {
            $rootScope.pageTitle = 'Blog';
          } else {
            $rootScope.pageTitle = 'Trainer App';
          }
        });

        vm.state = $state;
        vm.navigation = [
          {state: 'homeView.home', label: 'Home'},
          {state: 'homeView.about', label: 'About'},
          {state: 'homeView.services', label: 'Services'},
          {state: 'homeView.contact', label: 'Contact'},
          {state: 'homeView.blog', label: 'Blog'}
        ];

        // Socket.on('user_connected', function(user) {
        //   console.log('user connected ', user);
        // });
      }
    ]);
})();
