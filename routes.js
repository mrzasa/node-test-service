var entry = require('./app/entry')

module.exports = function (app) {
    app.post('/entry/', entry.create)
    app.get('/entry/', entry.list)
    app.get(/\/entry\/(\w{24})/, entry.get)
    app.del(/\/entry\/(\w{24})/, entry.delete)
    app.put(/\/entry\/(\w{24})/, entry.put)
}