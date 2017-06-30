var request = require('supertest'),
    should = require('should');


describe('Channel Controller', function () {

  before(function (done) {
    done(null, sails);
  });


  it('should get data', function (done) {
    request(sails.hooks.http.app)
      .get('/channel')
      .send({id: 3})
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        should.exist(res.body);
        done();
      });
  });

  it('should create channel', function (done) {
    request(sails.hooks.http.app)
      .get('/channel/create?name=hello')
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.property('name');
        should.exist(res.body);
        done();
      });
  });

  it('should create channel via object', function (done) {
    request(sails.hooks.http.app)
      .post('/channel/create')
      .send({name: 'hello'})
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.property('name');
        should.exist(res.body);
        done();
      });
  });
});
