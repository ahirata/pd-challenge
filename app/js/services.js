'use strict';

var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Album', ['$resource',
    function($resource) {
        return $resource('albums/:id', { id: '@_id' }, {
            'update': { method:'PUT' }
        });
    }
]);

