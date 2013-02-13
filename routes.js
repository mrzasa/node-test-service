var entry = require('./app/entry')

module.exports = function (app) {
    app.post('/entry/', entry.create);
    app.get('/entry/', entry.list);
    app.get(/\/entry\/(\w{24})/, entry.get);
}