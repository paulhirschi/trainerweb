(function() {
  'use strict';

  angular.module('authService', [])
    // =============================================
    // auth factory to login and get information
    // inject $http for communication with the api
    // inject $q to return promise objects
    // inject AuthToken to manage tokens
    // =============================================
    .factory('Auth', ['$rootScope', '$window', '$http', '$q', 'AuthToken',
      function($rootScope, $window, $http, $q, AuthToken) {
      var authFactory = {};

      // Handle login
      authFactory.login = function(loginData) {
        return $http.post('/api/authenticate', {
          data: loginData
        }).then(function(res) {
          console.log(res);
          AuthToken.setToken(res.data.token, res.data.name);
          return res;
        });
      };

      // Handle logout
      authFactory.logout = function() {
        // Clear the token
        AuthToken.setToken();
      };

      authFactory.signup = function(signupData) {
        return $http.post('/api/users/', signupData)
          .then(function(res) {
            return res;
          });
      };

      // check if a user is logged in
      authFactory.isLoggedIn = function() {
        // checks if there is a local token
        if($window.localStorage.getItem('token')) {
          return true;
        } else {
          return false;
        }
      };

      // get the user info
      authFactory.getUser = function() {
        if(AuthToken.getToken()) {
          return $http.get('/api/me', {
            cache: true
          });
        } else {
          return $q.reject({
            message: 'User has no token'
          });
        }
      };

      // return auth factory object
      return authFactory;
    }])
    // =============================================
    // factory for handling tokens
    // inject $window to store token client-side
    // =============================================
    .factory('AuthToken', ['$rootScope', '$window', function($rootScope, $window) {
      var authTokenFactory = {};

      // Get the token
      authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
      };

      // Set or clear the token
      authTokenFactory.setToken = function(token, name) {
        if(token) {
          $window.localStorage.setItem('token', token);
          var d = new Date();
          var n = d.getTime();
          $window.localStorage.setItem('ts', n);
          $window.localStorage.setItem('user', name);
          $rootScope.user = name;
        } else {
          $window.localStorage.removeItem('token');
          $window.localStorage.removeItem('ts');
          $window.localStorage.removeItem('user');
          $rootScope.user = '';
        }
      };

      return authTokenFactory;
    }])
    // =============================================
    // app config to integrate token into requests
    // =============================================
    .factory('AuthInterceptor', ['$q', '$location', 'AuthToken',
      function($q, $location, AuthToken) {
        var interceptorFactory = {};

        // Attach token to every request
        interceptorFactory.request = function(config) {
          var token = AuthToken.getToken();
          if(token) {
            config.headers['x-access-token'] = token;
          }
          return config;
        };

        // redirect if a token doesn't authenticate
        interceptorFactory.responseError = function(response) {
          if(response.status === 403) {
            $location.path('/login');
          }
          // return server errors as a promise
          return $q.reject(response);
        };

        return interceptorFactory;
      }]);
})();
