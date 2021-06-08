const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const labelData = require('./labels.json');

chai.should();

describe('createLabel', () => {
    it.only('given_Correct_Details_Should_Able_ToCreate_Label', () => {
        chai.request(server).post('/label').set('token', `${labelData.labels.genratedToken.token}`)
            .send(labelData.labels.createLabel).end((err, res) => {
                res.should.have.status(200);
            });
    });
    it('given_In_Correct_Details_Should_Not_Be_Able_To_Create_Label', () => {
        chai.request(server).post('/label').set('token', `${labelData.labels.genratedToken.token}`)
            .send().end((err, res) => {
                res.should.have.status(500);
            });
    });

});

describe('retrieveLabel', () => {
    it.only('given_Correct_Details_Should_Able_To_Retrieve_Label', () => {
        chai.request(server).get('/label').set('token', `${labelData.labels.genratedToken.token}`)
            .send().end((err, res) => {
                res.should.have.status(200);
            });
    });
});

describe('updateLabel', () => {
    it.only('given_Correct_Details_Should_Able_To_Update_Label', () => {
        chai.request(server).put('/label/60bed76e9315901fa8648bda').set('token',
            `${labelData.labels.genratedToken.token}`)
            .send(labelData.labels.updateLabel).end((err, res) => {
                res.should.have.status(200);
            });
    });

    it.only('givenWrongLabelId_whenImProper_shouldNotAbleToUpdateTheLabel', () => {
        chai.request(server).put('/label/60bed76e9315901648bda')
            .set('token', `${labelData.labels.genratedToken.token}`)
            .send(labelData.labels.updateLabel)
            .end((err, res) => {
                res.should.have.status(400);
            });
    });

});

describe('deleteLabel', () => {
    it.only('given_Correct_Details_Should_Able_To_Delete_Label', () => {
        chai.request(server).delete('/label/60bee68f2bea9217f44af367')
            .set('token', `${labelData.labels.genratedToken.token}`).send().end((err, res) => {
                res.should.have.status(200);
            });
    });

    it.only('givenLabelId_whenImProper_shouldNotAbleToDeletTheLabel', () => {
        chai.request(server).delete('/label/60bee68f2bea9217f4467')
            .set('token', `${labelData.labels.genratedToken.token}`).send()
            .end((err, res) => {
                res.should.have.status(400);
            });
    });

});