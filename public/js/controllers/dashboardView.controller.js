(function() {
  'use strict';

  angular.module('trainerWeb')
  .controller('DashboardViewCtrl', ['$rootScope', '$http', 'Socket',
    function($rootScope, $http, Socket) {
      var vm = this;

      // $rootScope.pageTitle = 'Dashboard';

      vm.message = 'Dashboard controller checking in';
      vm.tweets = [];

      // $http.get('/api/dashboard')
      //   .then(function success(res) {
      //     var data = res.data;
      //     console.log(data);
      //   }, function error(err) {
      //     console.log(err);
      //   });

      // Socket.on('tweet', function(tweet) {
      //   vm.tweets.push(tweet.text);
      // });

    }
  ]);
})();
