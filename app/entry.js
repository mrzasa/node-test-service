var mongo = require('../mongo'),
    async = require('async')

module.exports = {
    create: function (req, res) {
        if (!req.is('json')) {
            res.send(415)
            return;
        }
        if (!req.body) {
            res.send(400, "Request cannot be empty")
            return
        }
        mongo.open(function (err, client) {
            if (err) {
                res.send(500)
                return
            }
            var collection = new mongo.Collection(client, 'entries')
            collection.insert(req.body, function (err, inserted) {
                if (err) {
                    res.send(500)
                    return
                }
                res.send(201, inserted[0]["_id"]);
            })
        })
    },
    delete: function (req, res) {
        mongo.open(function (error, client) {
            if (error) {
                res.send(500);
                return;
            }
            var collection = new mongo.Collection(client, 'entries')
            collection.remove({
                '_id': new mongo.ObjectID(req.params[0])
            }, true, function (error) {
                if (error) {
                    res.send(500);
                    return;
                }
                res.send(200)
            })
        })
    },
    get: function (req, res) {
        mongo.open(function (error, client) {
            if (error) {
                res.send(500);
                return;
            }
            var collection = new mongo.Collection(client, 'entries')
            collection.findOne({'_id': new mongo.ObjectID(req.params[0])}, function (err, entry) {
                if (err) res.send(500)
                else if (entry) res.send(entry)
                else res.send(404)
            })
        })
    },
    list: function (req, res) {
        mongo.open(function (error, client) {
            if (error) {
                res.end(500);
                return;
            }
            var collection = new mongo.Collection(client, 'entries')
            var range = req.header("range")
            var skip = 0;
            var take = 10;
            if (range) {
                var match = /^rows=(\d+)-(\d*)$/g.exec(range)
                skip = parseInt(match[1]) || 0
                take = (parseInt(match[2]) || (skip + 10)) - skip
            }
            async.waterfall([
                collection.count.bind(collection),
                function (count, done) {
                    var to = (skip + take)
                    if (to > count) to = count
                    res.header("Content-Range", "rows " + skip + "-" + to + "/" + count)
                    collection.find({}, {
                        Teaser: true,
                        Title: true
                    }).skip(skip).limit(take).toArray(done)
                }
            ], function (err, list) {
                if (err) res.send(500)
                else res.send(206, list)
            })
        })
    },
    put: function (req, res) {
        if (!req.is('json')) {
            res.send(415)
            return;
        }
        if (!req.body) {
            res.send(400, "Request cannot be empty")
            return
        }
        mongo.open(function (error, client) {
            if (error) {
                res.send(500);
                return;
            }
            var collection = new mongo.Collection(client, 'entries')
            collection.update({
                '_id': new mongo.ObjectID(req.params[0])
            }, req.body, function (error) {
                if (error) {
                    res.send(500);
                    return;
                }
                res.send(200)
            })
        })
    }
}