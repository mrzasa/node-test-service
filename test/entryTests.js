var app = require('../app')
var request = require('supertest')(app)
var assert = require('assert');

var util = require('util')

describe('entry', function () {
    describe("create", function () {
        var testEntry = {
            Body: "test body",
            Teaser: "test teaser",
            Title: "test title"
        };
        var id;
        it("creates a entry", function (done) {
            request.post('/entry/')
                .send(testEntry)
                .expect(201)
                .end(function (err, res) {
                    id = res.body
                    done(err)
                })
        })
        it("can read the created entry", function (done) {
            request.get('/entry/' + id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    assert.equal(res.body.Body, testEntry.Body)
                    assert.equal(res.body.Teaser, testEntry.Teaser)
                    assert.equal(res.body.Title, testEntry.Title)
                    done(err)
                })
        })
    })
    describe("list", function () {
        it("can list elements", function (done) {
            request.get('/entry/')
                .expect(206)
                .expect('Content-Type', /json/)
                .expect('Content-Range', /^rows \d+-\d+\/\d+$/)
                .end(function (err, res) {
                    assert.ok(res.body instanceof Array)
                    done(err)
                })
        })
        it("can list entries using Range header", function (done) {
            request.get('/entry/')
                .set('Range', 'rows=10-20')
                .expect(206)
                .expect('Content-Range', /^rows 10-\d+\/\d+$/)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    assert.ok(res.body instanceof Array)
                    done(err)
                })
        })
    })
    describe("delete", function () {
        var id;
        before(function (done) {
            var testEntry = {
                Body: "test body",
                Teaser: "test teaser",
                Title: "test title"
            };
            request.post('/entry/')
                .send(testEntry)
                .expect(201)
                .end(function (err, res) {
                    id = res.body
                    done(err)
                })
        })
        it("can delete the created element", function (done) {
            request.del('/entry/' + id)
                .expect(200)
                .end(done)
        })
        it("cannot find the deleted element", function (done) {
            request.get('/entry/' + id)
                .expect(404)
                .end(done)
        })
    })
    describe("put", function () {
        var testEntry = {
            Body: "test body",
            Teaser: "test teaser",
            Title: "test title"
        };
        var id;
        before(function (done) {
            var testEntry = {
                Body: "test body",
                Teaser: "test teaser",
                Title: "test title"
            };
            request.post('/entry/')
                .send(testEntry)
                .expect(201)
                .end(function (err, res) {
                    id = res.body
                    done(err)
                })
        })
        it("can modify an entry", function (done) {
            testEntry.Body = "modified body"
            testEntry.Title = "modified title"
            request.put('/entry/' + id)
                .send(testEntry)
                .expect(200)
                .end(done)
        })
        it("can read the modified entry", function (done) {
            request.get('/entry/' + id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    assert.equal(res.body.Body, testEntry.Body)
                    assert.equal(res.body.Teaser, testEntry.Teaser)
                    assert.equal(res.body.Title, testEntry.Title)
                    done(err)
                })
        })

    })
})