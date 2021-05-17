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

class NoteApi 
{
    createNote = (req, res) => {
        if((!req.body.title) || (!req.body.description) ){
        return res.status(400).send({
            success: false,
            message: 'Please fill correct and complete details.'
        });
        };
        const noteData = {
                title: req.body.title,
                description: req.body.description,
                userId : req.userId
        }
        
        noteServices.createNote(noteData, (err, data) => {
            if(err){
                return res.status(401).send({
                    success: false,
                    message: 'Un-able to create your note, please check it again.',
                    err,
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Your note created successfully',
                });
            }
        });
    };

    updateNote = (req, res) => {
        if((!req.body.title) || (!req.body.description)){
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
            if(noteResult === null) {
                return res.status(404).send({
                    success: false,
                    message: 'Please check Id again' + res.params.noteId,
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
    };

    retrieveNote = (req, res) => {
        noteServices.retrieveNote((err, noteResult) => {
        if(err) {
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
    };

    deleteNote = (req, res) => {
        const nId = req.params.noteId;
        noteServices.deleteNote(nId, (err, noteResult) => {
            if(noteResult === null){
                return res.status(404).send({
                    success: false,
                    message: 'No note found with an Id - ' + nId + ' please check it again.',
                    
                });
            }else {
                return res.status(200).send({
                success: true,
                message: 'Your note  is deleted successfully'
                });
            }
        });  
    };

}

module.exports = new NoteApi();