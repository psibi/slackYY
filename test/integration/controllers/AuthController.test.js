var request = require('supertest'),
    should = require('should');


describe('Auth Controller', function () {

  beforeEach(function (done) {
    request(sails.hooks.http.app)
      .post('/user/create')
      .send({name: 'sibi', password: 'sibi', email: 'sibi@psibi.in'})
      .expect(200)
      .end(function(err, res) {
        done(null, sails);        
      })
  });

  it('try to login with invalid creds', function (done) {
    request(sails.hooks.http.app)
      .post('/login')
      .send({email: 'invalid@email.com', password: 'invalid'})
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.property('message').which.is.equal('Incorrect email.');
        done();
      });
  });

  it('successful login', function (done) {
    request(sails.hooks.http.app)
      .post('/login')
      .send({email: 'sibi@psibi.in', password: 'sibi'})
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.property('message').which.is.equal('Logged In Successfully');
        done();
      });
  });

  it('invalid password', function (done) {
    request(sails.hooks.http.app)
      .post('/login')
      .send({email: 'sibi@psibi.in', password: 'invalid'})
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.property('message').which.is.equal('Invalid Password');
        done();
      });
  });
});
