var request = require('supertest'),
    should = require('should');


describe('User Controller', function () {

  before(function (done) {
    done(null, sails);
  });

  it('should get data', function (done) {
    request(sails.hooks.http.app)
      .get('/user')
      .send({id: 3})
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        should.exist(res.body);
        done();
      });
  });

  it('should create user via object', function (done) {
    request(sails.hooks.http.app)
      .post('/user/create')
      .send({name: 'jasper', email: 'jasper@psibi.in', password: 'jasper'})
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.property('name').which.is.equal('jasper');
        should.exist(res.body);
        done();
      });
  });
});
