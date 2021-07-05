/* eslint-disable indent */
// eslint-disable-next-line spaced-comment
/*************************************************************************
 * Execution        : 1. default node       cmd> npm run test
 *
 * Purpose          : to write test cases for create, retrieve, update and delete note.
 *
 *
 * @file            : notes-test.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 *
 **************************************************************************/
/**
 * @description : writing test cases for note api
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const noteData = require('./notes.json');

chai.should();
let token = ' ';

describe('Notes', () => {
  before((done) => {
    chai.request(server).post('/login')
      .send(noteData.notes.login)
      .end((err, res) => {
        token = res.body.Token;
        done();
      });
  });

  describe('notes', () => {
    it('givenNoteDetails_whenProper_ShouldCreateNote', (done) => {
      chai.request(server).post('/notes').set('token', token)
        .send(noteData.notes.createNote)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('inCorrectNotes', () => {
    it('givenNoteDetails_whenWrong_ShouldNotCreateNote', (done) => {
      chai.request(server).post('/notes').set('token', token)
        .send(noteData.notes.createNoteWithWrongData)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('updateNote', () => {
    it('givenNoteDetails_whenProper_ShouldUpdateNote', (done) => {
      chai.request(server).put('/notes/60b700f1ad79c735800ccba3').set('token', token)
        .send(noteData.notes.updateNoteDetails)
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
  });

  describe('retreiveNotes', () => {
    it('givenNoteDetails_whenProper_shouldRetriveNote', (done) => {
      chai.request(server).get('/notes').set('token', token)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('deleteNotes', () => {
    it('givenNoteId_whenProper_shouldDeleteNote', (done) => {
      chai.request(server).delete('/notes/60ab2657c154d831f0b562a2').set('token', token)
        .send()
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
