var express = require('express')
    , path = require('path')
    , routes = require('./routes');

var app = express();

app.configure(function () {
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Range');
        if (req.method == "OPTIONS")
            res.send(200)
        else
            next();
    });
    routes(app)
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(function (req, res) {
        res.send(404)
    })
});

module.exports = app
