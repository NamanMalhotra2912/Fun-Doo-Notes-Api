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
const server = require('../server.js');

chai.use(chaiHttp);
const userData = require('./user.json');

chai.should();

describe('userRagistrartion', () => {
  it('check user with correct data for ragistration', (done) => {
    const userInfo = userData.user.correct_Data_For_Ragistration;
    chai.request(server).post('/userRagistrartion').send(userInfo).end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('inCorrectUser', () => {
  it('check user with in correct data for ragistration', (done) => {
    const userInfo = userData.user.in_correct_Data_For_Ragistration;
    chai.request(server).post('/inCorrectUser').send(userInfo).end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });
});

describe('login', () => {
  it('check user with correct data for login', (done) => {
    const userInfo = userData.user.check_UserLogin;
    chai.request(server).post('/login').send(userInfo).end((err, res) => {
      res.should.have.status(400);
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
      res.should.have.status(500);
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

describe('resetPassword', () => {
  it('check with correct reset password', (done) =>{
    const userInfo = userData.user.resetPassword;
    chai.request(server).post('/resetPassword').send(userInfo).end((err,res) =>{
      res.should.have.status(200);
      done();
    })
  })
});

describe('incorrect_resetPassword', () => {
  it('check with correct reset password', (done) =>{
    const userInfo = userData.user.incorrect_resetPassword;
    chai.request(server).post('/incorrect_resetPassword').send(userInfo).end((err,res) =>{
      res.should.have.status(404);
      done();
    })
  })
});
