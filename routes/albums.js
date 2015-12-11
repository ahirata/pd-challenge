'use strict';

var express = require('express');
var router = express.Router();
var Album = require('../model/album');

function internalServerError(next) {
    send(next, 500, 'Internal server error');
}

function send(next, code, msg) {
   next({
       status: code,
       message: msg
   });
}

function getQuery(req) {
    return {
        query: {
            match: {
                _all: req.query.search
            }
        }
    };
}

router.get('/', function(req, res, next) {
    if (req.query.search) {
        Album.search(getQuery(req), { hydrate: true }, function(err, results) {
            if (err) {
                internalServerError();
            } else {
                res.json({ albums: results.hits.hits });
            }
        });
    } else {
        Album.find({}, function(err, result) {
            res.json({ 'albums': result });
        });
    }
});

router.get('/:id', function(req, res, next) {
    Album.findById(req.params.id, function(err, result) {
        if (result) {
            res.json(result);
        } else {
            send(next, 404, 'Not Found');
        }
    });
});

router.post('/', function(req, res, next) {
    var album = new Album(req.body);

    album.save().then(function(data) {
        res.set({
            'Location': '/albums/' + album._id
        });

        res.sendStatus(201);

    }, function(err) {
        if (err.name === 'ValidationError'){
            send(next, 400, err.message);
        } else {
            internalServerError();
        }
    });
});

router.put('/:id', function(req, res, next) {
    delete req.body._id;

    Album.findOneAndUpdate({ _id : req.params.id }, {
        $set: req.body

    }).then(function() {
        res.sendStatus(200);

    }, function(err) {
        if (err.name == 'CastError') {
            send(next, 400, err.message);
        } else {
            internalServerError();
        }
    });
});

router.delete('/:id', function(req, res, next) {
    Album.remove({ _id: req.params.id }).then(function() {
        res.sendStatus(204);

    }, function(err) {
        if (err.name === 'CastError') {
            send(next, 404, 'Not Found');
        } else {
            internalServerError();
        }
    });
});

module.exports = router;

