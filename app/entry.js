var mongo = require('../mongo')

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
    get: function (req, res) {
        mongo.open(function (error, client) {
            if (error) {
                res.end(500);
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
            collection.find({}, {
                Teaser: true,
                Title: true
            }).toArray(function (err, list) {
                if (err) res.send(500)
                else res.send(list)
            })
        })
    }
}