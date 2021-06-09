const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const labelData = require('./labels.json');

chai.should();
describe('createLabel', () => {
    it.only('givenLabelDetails_whenProper_ShouldCreateLabel', () => {
        chai.request(server).post('/label').set('token', `${labelData.labels.genratedToken.token}`)
            .send(labelData.labels.createLabel).end((err, res) => {
                res.should.have.status(200);
            });
    });
    it('givedata_whenImProper_ShouldNotCreateLabel', () => {
        chai.request(server).post('/label').set('token', `${labelData.labels.genratedToken.token}`)
            .send().end((err, res) => {
                res.should.have.status(500);
            });
    });
    it.only('givenToken_whenImProper_shouldNotCreateLabel', () => {
        chai.request(server).post('/label').set('token', `${labelData.labels.genratedToken.wrongToken}`)
            .send(labelData.labels.createLabel)
            .end((err, res) => {
                res.should.have.status(401);
            });
    });

});

describe('retrieveLabel', () => {
    it.only('giveToken_whenProper_ShouldRetrieveLabel', () => {
        chai.request(server).get('/label').set('token', `${labelData.labels.genratedToken.token}`)
            .send().end((err, res) => {
                res.should.have.status(200);
            });
    });
    it.only('givenToken_whenImProper_shouldNotCreateLabel', () => {
        chai.request(server).post('/label').set('token', `${labelData.labels.genratedToken.wrongToken}`)
            .send(labelData.labels.createLabel)
            .end((err, res) => {
                res.should.have.status(401);
            });
    });
});

describe('updateLabel', () => {
    it.only('giveUpdatedata_whenProper_ShouldUpdateLabel', () => {
        chai.request(server).put('/label/60bed76e9315901fa8648bda').set('token',
            `${labelData.labels.genratedToken.token}`)
            .send(labelData.labels.updateLabel).end((err, res) => {
                res.should.have.status(200);
            });
    });

    it.only('giveUpdatedata_whenImProper_WithWrongLabelId_ShouldNotUpdateLabel', () => {
        chai.request(server).put('/label/60bed76e9315901648bda')
            .set('token', `${labelData.labels.genratedToken.token}`)
            .send(labelData.labels.updateLabel)
            .end((err, res) => {
                res.should.have.status(400);
            });
    });
    it.only('givenToken_whenImProper_shouldNotCreateLabel', () => {
        chai.request(server).post('/label').set('token', `${labelData.labels.genratedToken.wrongToken}`)
            .send(labelData.labels.createLabel)
            .end((err, res) => {
                res.should.have.status(401);
            });
    });

});

describe('deleteLabel', () => {
    it.only('giveLabelIddata_whenProper_ShouldDeleteLabel', () => {
        chai.request(server).delete('/label/60bee68f2bea9217f44af367')
            .set('token', `${labelData.labels.genratedToken.token}`).send().end((err, res) => {
                res.should.have.status(200);
            });
    });

    it.only('giveLabelIddata_whenImProper_ShouldNotDeleteLabel', () => {
        chai.request(server).delete('/label/60bee68f2bea9217f4467')
            .set('token', `${labelData.labels.genratedToken.token}`).send()
            .end((err, res) => {
                res.should.have.status(400);
            });
    });
    it.only('givenToken_whenImProper_shouldNotCreateLabel', () => {
        chai.request(server).post('/label').set('token', `${labelData.labels.genratedToken.wrongToken}`)
            .send(labelData.labels.createLabel)
            .end((err, res) => {
                res.should.have.status(401);
            });
    });

});