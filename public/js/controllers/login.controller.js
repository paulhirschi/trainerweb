(function() {
  'use strict';

  angular.module('trainerWeb')
    .controller('LoginCtrl', ['$rootScope', '$state', '$http', '$window', 'Auth',
      function($rootScope, $state, $http, $window, Auth) {
        var vm = this;

        $rootScope.pageTitle = 'Login';
        vm.loginData = {};
        vm.loginData.name = '';
        vm.loginData.user = '';
        vm.loginData.pass = '';

        // var loginData = btoa(vm.loginInfo.user + ':' + vm.loginInfo.pass);

        vm.loginUser = function() {
          // console.log(vm.loginData);
          // $state.go('main.dashboard');
          // Authentication goes here
          $rootScope.errorMessage = '';
          console.log('thingy');
          Auth.login(vm.loginData)
            .then(function success(res) {
              console.log(res);
              if(res.data.success == true) {
                // $window.localStorage.setItem('user', res.data.name);
                $state.go('main.dashboard');
              } else {
                $rootScope.errorMessage = 'Bad creds, yo. Try again.';
              }
            }, function error(err) {
              console.log(err);
              $rootScope.errorMessage = 'ERROR ' + err.data.message;
            });
        };
      }
    ]);
})();
