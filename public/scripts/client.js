var myApp = angular.module('myApp', ['ngRoute', 'xeditable', 'firebase']);
myApp.config(['$routeProvider', function($routeProvider) {

// var myApp = angular.module('myApp', ['ngRoute', 'xeditable', 'firebase', 'smart-table']);

myApp.run(function(editableOptions) {
     editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  });

    $routeProvider
        .when ('/login', {
          templateUrl: '/views/login.html',
          controller: 'LoginController',
          controllerAs: 'login'
        })
        .when ('/gigs', {
            templateUrl: '/views/gigs.html',
            controller: 'GigsController',
            controllerAs: 'gigs'
        })
        .when ('/mp3s', {
            templateUrl: '/views/mp3s.html',
            controller: 'mp3sController',
            controllerAs: 'mp3s'
        }).when ('/charts', {
            templateUrl: '/views/charts.html',
            controller: 'ChartsController',
            controllerAs: 'charts'
        }).when ('/contacts', {
            templateUrl: '/views/contacts.html',
            controller: 'ContactsController',
            controllerAs: 'contacts'
        }).when ('/setlists', {
            templateUrl: '/views/setlists.html',
            controller: 'SetlistsController',
            controllerAs: 'setlists'
        })
        .otherwise ( {
            redirectTo: '/login'
        });

}]);
