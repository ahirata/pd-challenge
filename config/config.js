var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var env = require('./env.json');

module.exports = {
    mongodb: env.mongodb,
    mongoosastic: env.mongoosastic,
    load: function (app, baseDir) {
        app.set('port', parseInt(process.env.PORT, 10) || env.defaultPort);
        app.use(express.static(path.join(baseDir, 'app')));
        app.set('views', path.join(baseDir, 'views'));
        app.set('view engine', 'jade');

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());

        app.use(logger('dev'));

        return app;
    }
};

