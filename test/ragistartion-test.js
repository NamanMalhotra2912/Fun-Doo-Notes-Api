const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

chai.use(chaiHttp);
const userData = require('./user.json');

chai.should();

describe('user', () => {
  it('check user with correct data for ragistration', (done) => {
    const userInfo = userData.user.correct_Data_For_Ragistration;
    chai.request(server).post('/user').send(userInfo).end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
// });

// describe('inCorrectUser', () => {
  it('check user with in correct data for ragistration', (done) => {
    const userInfo = userData.user.in_correct_Data_For_Ragistration;
    chai.request(server).post('/inCorrectUser').send(userInfo).end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});

describe('login', () => {
  it('check user with correct data for login', (done) => {
    const userInfo = userData.user.check_UserLogin;
    chai.request(server).post('/login').send(userInfo).end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('check user with in-correct data for login', (done) => {
    const userInfo = userData.user.check_Incorrect_UserLogin;
    chai.request(server).post('/login').send(userInfo).end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});

describe('forgetPassword', () => {
  it('check user with correct data for email-id', (done) => {
    const userInfo = userData.user.check_Forget_Password;
    chai.request(server).post('/forgetPassword').send(userInfo).end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('check user with in-correct data for email-id', (done) => {
    const userInfo = userData.user.check_InCorrect_Forget_Password;
    chai.request(server).post('/forgetPassword').send(userInfo).end((err, res) => {
      res.should.have.status(500);
      done();
    });
  });
});

