var albums = require('./albums');

function configureErrorHandler(app) {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        if (!err.contentType) {
            res.send(err.message);
        } else {
            res.render('error', {
                message: err.message,
                error: app.get('env') === 'development' ? err : {}
            });
        }
    });
}

function configure404(app) {
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}

module.exports = {
    load: function(app) {
        app.use('/albums', albums);

        configure404(app);
        configureErrorHandler(app);

        return app;
    }
};
