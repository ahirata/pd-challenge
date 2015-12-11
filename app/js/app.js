'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ui.bootstrap',
    'appServices',
    'appControllers'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/albums', {
        templateUrl: 'partials/main.html'
    })
    .when('/albums/new-album', {
        templateUrl: '/partials/album-form.html',
        controller: 'AddAlbumController'
    })
    .when('/albums/:id', {
        templateUrl: '/partials/album-form.html',
        controller: 'EditAlbumController'
    })
    .otherwise({
        redirectTo: '/albums'
    });
}]);
