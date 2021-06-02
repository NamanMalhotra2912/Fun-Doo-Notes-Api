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
 const server = require('../server.js');
 
 chai.use(chaiHttp);
 const noteData = require('./notes.json');
 
 chai.should();
 
 describe('notes', () => {
    it('given_Correct_Details_Should_Able_ToCreate_Note', (done) => {
      chai.request(server).post('/notes').set('token', `${noteData.notes.genratedToken.token}`)
        .send(noteData.notes.createNote).end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
 });

 describe('inCorrectNotes', () => {
  it('given_Wrong_Details_Should_Not_Be_Able_ToCreate_Note', (done) => {
    chai.request(server).post('/notes').set('token', `${noteData.notes.genratedToken.token}`)
      .send(noteData.notes.createNoteWithWrongData).end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

 describe('updateNote', () => {
  it('given_Correct_Details_Should_Be_Able_To_Update_Note', (done) => {
    chai.request(server).put('/notes/60b700f1ad79c735800ccba3').set('token', `${noteData.notes.genratedToken.token}`)
      .send(noteData.notes.updateNoteDetails).end((err, res) => {
        res.should.have.status(200);
      });
      done();
  });
});

// describe('inCorrectUpdateNote', () => {
//   it('given_inCorrect_Details_Should_Not_Be_Able_To_Update_Note', (done) => {
//     chai.request(server).put('/notes/60b5ae6a67f4ffc93b6d6').set('token', `${noteData.notes.genratedToken.token}`)
//       .send(noteData.notes.updateNoteDetails).end((err, res) => {
//         res.should.have.status(200);
//       });
//       done();
//   });
// });

describe('retreiveNotes', () => {
  it('given_Correct_Details_should_Retrive_Note', (done) => {
    chai.request(server).get('/notes').set('token', `${noteData.notes.genratedToken.token}`)
      .send().end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('deleteNotes', () => {
  it('given_Correct_Details_should_Delete_Note', (done) => {
    chai.request(server).delete('/notes/60ab2657c154d831f0b562a2').set('token', `${noteData.notes.genratedToken.token}`)
      .send().end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
