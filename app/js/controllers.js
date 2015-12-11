'use strict';

var appControllers = angular.module('appControllers', []);

function defineBaseFormControls($scope, $window) {
    $scope.cancel = function() {
        $window.location.href = '/#';
    };

    $scope.add = function() {
        if ($scope.newTrack) {
            $scope.album.tracks.push($scope.newTrack);
            $scope.newTrack = null;
        }
    };

    $scope.remove = function(index) {
        $scope.album.tracks.splice(index, 1);
    };
}

appControllers.controller('SearchController', ['$scope', '$window',
    function($scope, $window) {
        $scope.search = function() {
            $window.location.href = '/#/albums?search=' + $scope.term;
        };
    }
]);

appControllers.controller('AlbumListController', ['$scope', 'Album', '$location',
    function($scope, Album, $location) {
        $scope.is_search = $location.search().search;
        Album.get($location.search()).$promise.then(function(data) {
            if (data.albums.length) {
                $scope.albums = data.albums.map(function(album) {
                    return new Album(album);
                });
            }});

        $scope.remove = function(album, index) {
            album.$remove(function() {
                $scope.albums.splice(index, 1);
            }, function(err) {
                alert(err);
            });
        };
    }
]);

appControllers.controller('AddAlbumController', ['$scope' , '$window', 'Album',
    function($scope, $window, Album) {
        $scope.title = 'Add new album';
        $scope.album = {
            tracks: []
        };
        $scope.save = function() {
            if ($scope.albumForm.$valid) {
                $scope.album.tags = ($scope.tagholder || '').split(' ');
                Album.save($scope.album, function() {
                    $window.location.href = '/#/';
                }, function(err) {
                    alert(err.data);
                });
            }
        };


        defineBaseFormControls($scope, $window);
    }
]);

appControllers.controller('EditAlbumController', ['$scope', '$window', '$routeParams', 'Album',
    function($scope, $window, $routeParams, Album) {
        Album.get({ id: $routeParams.id }).$promise.then(function(data) {
            $scope.title = 'Edit album';
            $scope.album = new Album(data);
            $scope.tagholder = $scope.album.tags.join(' ');
        }, function(error) {
            alert(error.statusText);
            $window.location.href = '/#';
        });

        $scope.save = function() {
            if ($scope.albumForm.$valid) {
                $scope.album.tags = ($scope.tagholder || '').split(' ');
                Album.update($scope.album, function() {
                    $window.location.href = '/#/';
                }, function(err) {
                    alert(err.data);
                });
            }
        };

        defineBaseFormControls($scope, $window);
    }
]);

