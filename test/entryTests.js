var omf = require('omf')
var app = require('../app')
var assert = require('assert');

var util = require('util')


omf(app, function (client) {
    describe("create", function () {
        var testEntry = {
            Body: "test body",
            Title: "test title"
        };
        client.post('/entry/',
            {json: testEntry}
            , function (res) {
                res.has.statusCode(201)
                it("can be found", function(){
                    assert.ok(this.response.body, "assigned id has to be returned")
                    console.log(this.response.body)
                    /*client.get('/entry/' + this.response.body, function(res){
                        res.has.statusCode(200)
                        res.has.json()
                        it("is the same as inserted", function(){
                            var found = JSON.parse(this.response.body)
                            assert.equal(found.Body, testEntry.Body)
                            assert.equal(found.Title, testEntry.Title)
                        })
                    })*/
                })
            }
        )
    })
    describe("list", function () {
        client.get('/entry/', function (res) {
            res.has.statusCode(200)
            res.has.json();
            it("is an array", function () {
                assert.ok(JSON.parse(this.response.body) instanceof Array)
            })
        })
    })
})