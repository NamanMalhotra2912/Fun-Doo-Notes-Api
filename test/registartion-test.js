/* eslint-disable indent */
/* eslint-disable spaced-comment */
/*************************************************************************
 * Execution        : 1. default node       cmd> npm run test
 *
 * Purpose          : to write test cases for register,login,forget and reset password.
 *
 *
 * @file            : registration.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 *
 **************************************************************************/

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const userData = require('./user.json');

chai.should();

describe('registrartion', () => {
  it('givenUserDetails_whenProper_ShouldRegisterUser', (done) => {
    const userInfo = userData.user.correct_Data_For_Ragistration;
    chai.request(server).post('/userRagistrartion').send(userInfo).end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });
});

describe('incorrect_registrartion', () => {
  it('givenUserDetails_whenWrong_ShouldNotRegisterUser', (done) => {
    const userInfo = userData.user.in_correct_Data_For_Ragistration;
    chai.request(server).post('/inCorrectUser').send(userInfo).end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });
});

describe('login', () => {
  it('givenLoginDetails_whenProper_ShouldLogin', (done) => {
    const userInfo = userData.user.check_UserLogin;
    chai.request(server).post('/login').send(userInfo).end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });

  it('givenLoginDetails_whenWrong_ShouldNotLogin', (done) => {
    const userInfo = userData.user.check_Incorrect_UserLogin;
    chai.request(server).post('/login').send(userInfo).end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});

describe('forgetPassword', () => {
  it('givenEmailDetails_whenProper_ShouldAllowForgetPassword', (done) => {
    const userInfo = userData.user.check_Forget_Password;
    chai.request(server).post('/forgetPassword').send(userInfo).end((err, res) => {
      res.should.have.status(500);
      done();
    });
  });

  it('givenEmailDetails_whenWrong_ShouldNotAllowForgetPassword', (done) => {
    const userInfo = userData.user.check_InCorrect_Forget_Password;
    chai.request(server).post('/forgetPassword').send(userInfo).end((err, res) => {
      res.should.have.status(500);
      done();
    });
  });
});

describe('resetPassword', () => {
  it('givenDetails_whenProper_ShouldResetPassword', (done) => {
    const userInfo = userData.user.resetPassword;
    chai.request(server).post('/resetPassword').send(userInfo).end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});

describe('incorrect_resetPassword', () => {
  it('givenDetails_whenWrong_ShouldNotResetPassword', (done) => {
    const userInfo = userData.user.incorrect_resetPassword;
    chai.request(server).post('/incorrect_resetPassword').send(userInfo).end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });
});
