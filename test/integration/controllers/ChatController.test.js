var request = require('supertest'),
    should = require('should');
    shouldhttp = require('should-http');


describe('Chat Controller', function () {

  beforeEach(function (done) {
    done(null, sails);        
  });
  
  it('should render chat view', function(done) {
    request(sails.hooks.http.app)
      .get('/chat')
      .expect(200)
      .end(function (err, res) {
        should.exist(res.body);
        res.should.header('content-type', 'text/plain; charset=UTF-8');
        done();
      });
  })
  
  it('http should fail for socket join interface', function(done) {
    request(sails.hooks.http.app)
      .get('/chat/channel/join')
      .expect(200)
      .end(function (err, res) {
        res.should.have.status(400);
        done();
      });
  });

  it('http should fail for socket message interface', function(done) {
    request(sails.hooks.http.app)
      .get('/chat/channel/message')
      .expect(200)
      .end(function (err, res) {
        res.should.have.status(400);
        done();
      });
  });
});
