var express = require('express')
    , path = require('path')
    , routes = require('./routes');

var app = express();

app.configure(function () {
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    routes(app)
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(function(req,res){
        res.send(404)
    })
});

module.exports = app
