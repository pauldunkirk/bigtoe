var myApp = angular.module('myApp', ['ngRoute', 'xeditable', 'firebase', 'ui.bootstrap']);
// ui.bootstrap allows toggleable nav bar to begin collapsed- see nav.html
//possibly in the future, use these tools:
// var myApp = angular.module('myApp', ['ngRoute', 'xeditable', 'firebase', 'ui.bootstrap', 'smart-table', 'angular-touch', 'angular-animate']); //then source in html


myApp.config(['$routeProvider', function($routeProvider) {

//exeditable needs to be within routeProvider or will get 'glyphicon' errors in console and the save and delete button are squares rather than showing the words 'save' and 'delete', BUT exeditable still works in the sense that edits are still saved
myApp.run(function(editableOptions) {
     editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  });

    $routeProvider
        .when ('/login', {
          templateUrl: '/views/login.html',
          controller: 'LoginController',
          controllerAs: 'login'
        }).when ('/requests', {
            templateUrl: '/views/requests.html',
            controller: 'LoginController',
            controllerAs: 'requests'
        }).when ('/gigs', {
            templateUrl: '/views/gigs.html',
            controller: 'GigsController',
            controllerAs: 'gigs'
        }).when ('/players', {
            templateUrl: '/views/players.html',
            controller: 'GigsController',
            controllerAs: 'players'
        }).when ('/mp3s', {
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
        }).when ('/video', {
            templateUrl: '/views/video.html',
            controller: 'VideoController',
            controllerAs: 'video'
        }).otherwise ({
            redirectTo: '/login'
        });

}]); //end routeProvider confg
