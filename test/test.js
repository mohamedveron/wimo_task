'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../server.js'); // Our app

describe('API endpoint /data', function() {
  this.timeout(5000); // How long to wait for a response (ms)

  // GET - List all tasks
  it('should return all tasks', function() {
    return chai.request(app)
      .get('/data')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  // GET - Invalid path
  it('should return Not Found', function() {
    return chai.request(app)
      .get('/INVALID_PATH')
      .then(function(res) {
        expect(res).to.have.status(404);
      })
  });

});

describe('API endpoint /update task', function() {
  this.timeout(5000); // How long to wait for a response (ms)

  // POST - Update Task
  it('should Update Task', function() {
    return chai.request(app)
      .post('/updateTask')
      .send({
         "id" : 2,
         "status": "com"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.text).to.be.an('string').equals('success');
      });
  });

});

describe('API endpoint /Get Filtered Data', function() {
  this.timeout(5000); // How long to wait for a response (ms)

  // POST - getFilteredData by status
  it('should get tasks  filtered by status', function() {
    return chai.request(app)
      .post('/getFilteredData')
      .send({
         "type" : "status",
          "value": "completed"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  // POST - getFilteredData by driver
  it('should get tasks  filtered by driver', function() {
    return chai.request(app)
      .post('/getFilteredData')
      .send({
         "type" : "driver",
          "value": "Marko Pandres"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  // POST - getFilteredData by courier
  it('should get tasks  filtered by courier', function() {
    return chai.request(app)
      .post('/getFilteredData')
      .send({
         "type" : "courier",
          "value": "Wimo"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

});