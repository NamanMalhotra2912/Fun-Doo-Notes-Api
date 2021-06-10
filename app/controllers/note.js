/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 * 
 * Purpose          : to create the schemas for note making api.
 *                    
 * 
 * @file            : user.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 * 
**************************************************************************/
const noteServices = require('../services/note');

class NoteApi {
    /**
     * 
     * @method : createNote is used to create note for user.
     * @param {httpRequest} req 
     * @param {http Response} res 
     *  
     */
    createNote = (req, res) => {
        try {
            if ((!req.body.title) || (!req.body.description)) {
                return res.status(400).send({
                    success: false,
                    message: 'Please fill correct and complete details.'
                });
            };
            const noteData = {
                title: req.body.title,
                description: req.body.description,
                userId: req.userId
            }
            noteServices.createNote(noteData, (err, data) => {
                if (err) {
                    return res.status(401).send({
                        success: false,
                        message: 'Un-able to create your note, please check it again.',
                        err,
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Your note created successfully',
                        data
                    });
                }
            });
        }
        catch (error) {
            res.status(500).send({
                success: false,
                message: "There is some internal error from server"
            })
        }
    }
    /**
     * 
     * @method : updateNote is used to update the already created note by user..
     * @param {httpRequest} req 
     * @param {http Response} res 
     *  
     */
    updateNote = (req, res) => {
        try {
            if ((!req.body.title) || (!req.body.description)) {
                return res.status(400).send({
                    success: false,
                    message: 'Please fill correct and complete details.'
                });
            };

            const noteData = {
                title: req.body.title,
                description: req.body.description,
                noteId: req.params.noteId
            }

            noteServices.updateNote(noteData, (err, noteResult) => {
                if (noteResult === null) {
                    return res.status(400).send({
                        success: false,
                        message: 'Please check your Id again' + res.params.noteId,
                        err,
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Your note is updated successfully',
                        // data: noteResult
                    });
                }
            });
        }
        catch (error) {
            res.status(500).send({
                success: false,
                message: "There is some internal error from server."
            })
        }
    };
    /**
     * 
     * @method : retrieveNote is used to retrieve the notes.
     * @param {httpRequest} req 
     * @param {http Response} res 
     *  
     */
    retrieveNote = (req, res) => {
        try {
            noteServices.retrieveNote((err, noteResult) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Un-able to retrive notes'
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Your notes retrived successfully',
                        data: noteResult
                    });
                }
            });
        }
        catch (error) {
            res.status(500).send({
                success: false,
                message: "There is some internal error from server"
            })
        }
    };
    /**
     * 
     * @method : deleteNote is used to delete the note.
     * @param {httpRequest} req 
     * @param {http Response} res 
     *  
     */
    deleteNote = (req, res) => {
        try {
            const noteId = req.params.noteId;
            noteServices.deleteNote(noteId, (err, noteResult) => {
                if (noteResult === null) {
                    return res.status(404).send({
                        success: false,
                        message: 'No note found with an Id - ' + noteId + ' please check it again.',
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Your note  is deleted successfully'
                    });
                }
            });
        }
        catch (error) {
            res.status(500).send({
                success: false,
                message: "There is some internal error from server"
            })
        }
    };
    /**
     * 
     * @param {httpRequest} req 
     * @param {http Response} res 
     * @description :  addLabelToNote is used to add the label to the note.
     */
    addLabelToNote = (req, res) => {
        try {
            const data = {
                labelId: req.body.labelId,
                noteId: req.body.noteId,
                userId: req.userId,
            };
            noteServices.addLabelToNote(data, (err, data) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Unable to add your label into note',
                        err,
                    });
                }
                return res.status(200).send({
                    success: true,
                    message: 'Your label is added to the note successfully',
                    data
                });
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'There is some internal error from server'
            });
        }
    }
    /**
     * 
     * @param {httpRequest} req 
     * @param {http Response} res 
     * @description :  removeLabelFromNote is used to remove the label from the note.
     */
    removeLabelFromNote = (req, res) => {
        try {
            const data = {
                labelId: req.body.labelId,
                noteId: req.body.noteId,
                userId: req.userId,
            };
            noteServices.removeLabelFromNote(data).then(() => {
                res.status(200).send({
                    success: true,
                    message: 'Your Label is removed from note',
                });
            }).catch((err) => {
                res.status(400).send({
                    success: false,
                    message: 'Unable to remove your note',
                    err,
                });
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'There is some internal error from server',
            });
        }
    }
    /**
    * @description Add User With Note
    * @param {*} request in json formate
    * @param {*} response sends response from server
    */
    addCollaborator = (req, res) => {
        try {
            const data = {
                collaborator: req.body.collaborator,
                noteId: req.body.noteId,
                userId: req.body.userId,
            }
            noteServices.addCollaborator(data, (err, data) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Unable To Collaborate your note',
                        err,
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Collaborate your note successfully',
                        data,
                    });
                }
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'There is some internal error from server'
            });
        }
    };
    removeCollaborator = (req, res) => {
        try {
            const data = {
                collaborator: req.body.collaborator,
                noteId: req.body.noteId,
                userId: req.userId,
            };
            noteServices.removeLabelFromNote(data).then(() => {
                res.status(200).send({
                    success: true,
                    message: 'Your collaborator is removed from note',
                });
            }).catch((err) => {
                res.status(400).send({
                    success: false,
                    message: 'Unable to remove your collaborator',
                    err,
                });
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'There is some internal error from server',
            });
        }
    }
}
module.exports = new NoteApi();