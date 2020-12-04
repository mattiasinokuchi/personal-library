/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
let testId = null;
let urlWithValidId = null;

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  /*
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, true);
        assert.property(res.body[0], 'commentcount', true);
        assert.property(res.body[0], 'title', true);
        assert.property(res.body[0], '_id', true);
        done();
      });
  });
  */
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({
          title: 'ABC'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body, true);
          assert.property(res.body, 'title', true);
          assert.property(res.body, '_id', true);
          assert.equal(res.body.title, 'ABC');
          assert.equal(Object.keys(res.body).length, 2);
          testId = res.body._id;
          done();
        });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({
          title: ''
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'missing required field title');
          done();
        });
      });
      
    });

    suite('GET /api/books => array of books', function() {
      
      test('Test GET /api/books',  function(done) {
        chai.request(server)
        .get('/api/books')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body, true);
          assert.property(res.body[0], 'title', true);
          assert.property(res.body[0], '_id', true);
          assert.property(res.body[0], 'commentcount', true);
          done();
        });
      });      
      
    });

    suite('GET /api/books/[id] => book object with [id]', function() {
      
      test('Test GET /api/books/[id] with id not in db', function(done) {
        chai.request(server)
        .get('/api/books/idnotindb')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no book exists');
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db', function(done) {

      urlWithValidId = '/api/books/' + testId;

        chai.request(server)
        .get(urlWithValidId)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body, true);
          assert.property(res.body, 'comments', true);
          assert.property(res.body, 'title', true);
          assert.property(res.body, '_id', true);
          done();
        });
      });
      
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done) {
        chai.request(server)
        .post(urlWithValidId)
        .send({
          comment: 'DEF'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body, true);
          assert.property(res.body, 'comments', true);
          assert.property(res.body, 'title', true);
          assert.property(res.body, '_id', true);
          assert.equal(res.body.comments.length, 1);
          done();
        });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
        .post(urlWithValidId)
        .send({
          comment: ''
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'missing required field comment');
          done();
        });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
        .post('/api/books/idnotindb')
        .send({
          comment: 'GHI'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no book exists');
          done();
        });
      });      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
        .delete(urlWithValidId)
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'delete successful');
          done();
        });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
        .delete('/api/books/idnotindb')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no book exists');
          done();
        });
      });
    });
  });
});
