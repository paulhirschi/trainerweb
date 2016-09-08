(function() {
  'use strict';

  angular.module('trainerWeb', [
      'ui.router',
      'ngCookies',
      'ngTouch',
      'ngAria',
      'ngAnimate',
      'btford.socket-io',
      'authService'
    ])
  .factory('Socket', ['socketFactory', function(socketFactory) {
    return socketFactory();
  }])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('homeView', {
        templateUrl  : 'homeView.html',
        controller   : 'HomeViewCtrl',
        controllerAs : 'homeView'
      })
      .state('homeView.home', {
        url          : '/',
        templateUrl  : 'home.html',
        controller   : 'HomeCtrl',
        controllerAs : 'home'
      })
      .state('homeView.about', {
        url          : '/about',
        templateUrl  : 'about.html',
        controller   : 'HomeCtrl',
        controllerAs : 'home'
      })
      .state('homeView.services', {
        url          : '/services',
        templateUrl  : 'services.html',
        controller   : 'HomeCtrl',
        controllerAs : 'home'
      })
      .state('homeView.contact', {
        url          : '/contact',
        templateUrl  : 'contact.html',
        controller   : 'HomeCtrl',
        controllerAs : 'home'
      })
      .state('homeView.blog', {
        url          : '/blog',
        templateUrl  : 'blog.html',
        controller   : 'BlogCtrl',
        controllerAs : 'blog'
      })
      .state('homeView.signup', {
        url          : '/signup',
        templateUrl  : 'signup.html',
        controller   : 'HomeCtrl',
        controllerAs : 'home'
      })
      .state('login', {
        url          : '/login',
        templateUrl  : 'login.html',
        controller   : 'LoginCtrl',
        controllerAs : 'login'
      })
      .state('dashboardView', {
        templateUrl  : 'dashboardView.html',
        controller   : 'DashboardViewCtrl',
        controllerAs : 'dashboardView'
      })
      .state('dashboardView.myplan', {
        url          : '/:user/myplan',
        templateUrl  : 'myplan.html',
        controller   : 'MyPlanCtrl',
        controllerAs : 'myPlan'
      })
      .state('dashboardView.mystats', {
        url          : '/:user/mystats',
        templateUrl  : 'mystats.html',
        controller   : 'MyStatsCtrl',
        controllerAs : 'myStats'
      })
      .state('dashboardView.notifications', {
        url          : '/:user/notifications',
        templateUrl  : 'notifications.html',
        controller   : 'NotificationsCtrl',
        controllerAs : 'notifications'
      })
      .state('dashboardView.settings', {
        url          : '/:user/settings',
        templateUrl  : 'settings.html',
        controller   : 'SettingsCtrl',
        controllerAs : 'settings'
      })
      .state('main.help', {
        url          : '/help',
        templateUrl  : 'help.html',
        controller   : 'HelpCtrl',
        controllerAs : 'help'
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }])
  .run(['$rootScope', '$window', '$state', 'Auth',
    function($rootScope, $window, $state, Auth) {
      $rootScope.app_name = 'trainerWeb';
      $rootScope.user = $window.localStorage.getItem('user');

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.loggedIn = Auth.isLoggedIn();
        var d = new Date();
        var now = d.getTime();
        var then = $window.localStorage.getItem('ts');
        var dateDif = Math.abs(now - then) / 36e5;
        // If logged in, redirect to dashboard
        // if(toState.name === 'login' && $rootScope.loggedIn) {
        //   event.preventDefault();
        //   $state.go('main.dashboard');
        // }
        //  If user not logged in, redirect to login
        // if(toState.name !== 'login' && !$rootScope.loggedIn) {
        //   event.preventDefault();
        //   $rootScope.errorMessage = "Gotta log in";
        //   $state.go('home');
        // }
        // Log user out automatically after 8 hours
        // if($rootScope.loggedIn && dateDif >= 8) {
        //   event.preventDefault();
        //   Auth.logout();
        //   $rootScope.errorMessage = 'Session has timed out. Please log in to continue';
        //   $state.go('login');
        // }
      });
    }
  ]);
})();
