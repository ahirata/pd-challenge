'use strict';

describe('my app', function() {

    var originalAlbumCount;
	var key;

    function getAlbums() {
        return element.all(by.css('.album-item'));
    }

    beforeAll(function() {
        key = new Date().getTime();
        browser.get('');

        getAlbums().count().then(function(val) {
            originalAlbumCount = val;
        });
    });

    beforeEach(function() {
        browser.get('');
    });

    describe('Add album', function() {
        it('shoud cancel add', function() {
            element(by.id('new-album')).click();
            element(by.buttonText('Cancel')).click();

            getAlbums().count().then(function(val) {
                expect(val).toBe(originalAlbumCount);
            });
        });

        it('should add album', function() {
            element(by.id('new-album')).click();

            var form = element(by.id('add-album-form'));
            form.element(by.model('album.name')).sendKeys('Images & Words');
            form.element(by.model('album.artist')).sendKeys('Dream Theater' + key);
            form.element(by.model('album.genre')).sendKeys('Metal');
            form.element(by.model('album.year')).sendKeys('1992');
            form.element(by.model('tagholder')).sendKeys('ProgMetal Virtuose');
            form.element(by.model('newTrack')).sendKeys('Take the time');
            form.element(by.id('add')).click();
            form.element(by.model('newTrack')).sendKeys('Learning to live');
            form.element(by.id('add')).click();

            form.element(by.buttonText('Save')).click();

            var albums = getAlbums();

            expect(albums.last().getText()).toBe('Images & Words by Dream Theater' + key);
            albums.count().then(function(val) {
                expect(val).toBe(originalAlbumCount + 1);
            });
        });

        describe('List albums', function() {
            it('should list the added album', function() {
                expect(getAlbums().last().getText()).toBe('Images & Words by Dream Theater' + key);
            });
        });

        describe('Edit album', function() {
            it('should edit the album info', function() {
                getAlbums().last().click();

                var form = element(by.id('add-album-form'));

                form.element(by.model('album.name')).sendKeys(' Changed');
                form.element(by.buttonText('Save')).click();

                var albums = getAlbums();

                expect(albums.last().getText()).toBe('Images & Words Changed by Dream Theater' + key);

                albums.count().then(function(val) {
                    expect(val).toBe(originalAlbumCount + 1);
                });
            });

            it('should list the edited  album', function() {
                expect(getAlbums().last().getText()).toBe('Images & Words Changed by Dream Theater' + key);
            });
        });

        describe('Delete album', function() {
            it('should delete the album', function() {
                element.all(by.css('.remove-album-item')).last().click().then(function() {
                    var albums = getAlbums();
                    albums.count().then(function(val) {
                        expect(val).toBe(originalAlbumCount);
                    });
                });
            });
        });
    });
});
