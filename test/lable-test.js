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

describe('addLabelToNote', () => {
    it.only('givenLabelAndNoteId_whenProper_shouldAddLabelToTheNote', () => {
        chai.request(server).post('/addLabelToNote').set('token', `${labelData.labels.genratedToken.token}`)
            .send(labelData.labels.addLabelWithProperDetails)
            .end((err, res) => {
                res.should.have.status(200);
            });
    });
    it.only('givenLabelId_whenImProper_ShouldNotDeleteLabel', () => {
        chai.request(server).delete('/label/60c2cb2932aa660f550')
            .set('token', `${labelData.labels.genratedToken.token}`).send()
            .end((err, res) => {
                res.should.have.status(400);
            });
    });
    it.only('givenToken_whenImProper_shouldNotAddLabelToNote', () => {
        chai.request(server).post('/addLabelToNote').set('token', `${labelData.labels.genratedToken.wrongToken}`)
            .send(labelData.labels.addLabelWithProperDetails)
            .end((err, res) => {
                res.should.have.status(401);
            });
    });
    it.only('givenToken_whenMissing_shouldNotAddLabelToTheNote', () => {
        chai.request(server).post('/addLabelToNote').send(labelData.labels.addLabelWithProperDetails)
            .end((err, res) => {
                res.should.have.status(401);
            });
    });
});

describe('removeLabelToNote', () => {
    it.only('givenLabelAndNoteId_whenProper_shouldRemoveLabelFromNote', () => {
        chai.request(server).delete('/removeLabelFromNote')
            .set('token', `${labelData.labels.genratedToken.token}`)
            .send(labelData.labels.addLabelWithProperDetails)
            .end((err, res) => {
                res.should.have.status(200);
            });
    });

    it.only('givenToken_whenImProper_shouldNotRemoveLabelFromNote', () => {
        chai.request(server).delete('/removeLabelFromNote')
            .set('token', `${labelData.labels.genratedToken.wrongToken}`)
            .send(labelData.labels.addLabelWithProperDetails)
            .end((err, res) => {
                res.should.have.status(401);
            });
    });

    it.only('givenToken_whenMissing_shouldNotRemoveLabelFromNote', () => {
        chai.request(server).delete('/removeLabelFromNote').send(labelData.labels.addLabelWithProperDetails)
            .end((err, res) => {
                res.should.have.status(401);
            });
    });
});
