var app = require('../app.js').app;
var supertest = require('supertest');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['awesome'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {

    supertest(app)
      .get('/face/tiger+woods')
      .expect(302)    
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        test.done();
      });     

  },

  'flag': function(test) {
    supertest(app)
      .get('/flag/spain')
      .expect(302)    
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        test.done();
      });     
    },

  'proxy': function(test) {
    supertest(app)
      .get('/proxy?url=http://en.wikipedia.org/wiki/FIBA_World_Rankings')
      .expect(200)    
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        test.done();
      });     
  }    
};