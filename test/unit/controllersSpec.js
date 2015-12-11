'use strict';

describe('app controllers', function() {
    beforeEach(module('app'));
    beforeEach(module('appServices'));

    var albumGenerator = function() {
        return { albums: [
            { _id: 1, name: 'Master of Puppets', artist: 'Metallica' },
            { _id: 2, name: 'Cowboys from Hell', artist: 'Pantera' }
        ]};
    };

    var controller, $controller, $httpBackend, scope, Album;

    beforeEach(inject(function(_$httpBackend_, $rootScope, _$controller_, _Album_) {
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
        Album = _Album_;
        $controller = _$controller_;
    }));

    describe('AlbumListController', function() {
        beforeEach(function() {
            $httpBackend.whenGET('albums').respond(albumGenerator());
            controller = $controller('AlbumListController', { $scope: scope});
        });

        it('should contain two albums', function() {
            expect(scope.albums).toBeUndefined();

            $httpBackend.flush();

            expect(scope.albums.length).toEqual(2);
        });

        it('should be able to remove an album', function() {
            expect(scope.remove).toBeDefined();

            $httpBackend.flush();

            var previousLength = scope.albums.length;
            var spy = { $remove: (cb) => cb() };

            spyOn(spy, '$remove').and.callThrough();;

            scope.remove(spy, 1);

            expect(spy.$remove).toHaveBeenCalled();
            expect(scope.albums.length).toBe(previousLength - 1);
        });
    });

    describe('AddAlbumController', function() {
        beforeEach(function() {
            controller = $controller('AddAlbumController', { $scope: scope});
        });

        it('should be able to add an album', function() {
            expect(scope.save).toBeDefined();

            spyOn(Album, 'save').and.callThrough();
            scope.save();

            expect(scope.album).toBeDefined();
            expect(Album.save).toHaveBeenCalledWith(scope.album, jasmine.anything(), jasmine.anything());
        });
    });
});
