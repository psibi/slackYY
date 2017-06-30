var request = require('supertest'),
    should = require('should');


describe('Message Controller', function () {

  beforeEach(function (done) {
    request(sails.hooks.http.app)
      .post('/channel')
      .send({name: 'nodejs'})
      .expect(200)
      .end(function(err, res) {
        done(null, sails);        
      })
  });

  it('should get empty data', function (done) {
    request(sails.hooks.http.app)
      .get('/message')
      .send({id: 3})
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.be.empty();
        should.exist(res.body);
        done();
      });
  });

  it('should create user via object', function (done) {
    request(sails.hooks.http.app)
      .post('/message/create')
      .send({msg: 'helloWorld', userName: 'sibi', channel: 1})
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.property('userName').which.is.equal('sibi');
        should.exist(res.body);
        done();
      });
  });
});
