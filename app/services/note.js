/** ***********************************************************************
 * Execution        : 1. default node       cmd> npm start
 *
 * Purpose          : to create the service for business logic of note Api.

 * @file            : note.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0
 ************************************************************************* */
const notemodel = require('../models/note');
const { redisFunction } = require('../../helper/validationSchema.js');
const help = require('../../helper/collaboratorHelper.js');
/**
* @class NoteService to include all notes api.
* @description this will work as middleware between model and controller.
*/
class NoteService {
    /**
     * 
     * @param {*} noteInfo will take data for the note
     * @description : createNote is used to take data from controller then pass it to models
     */
    createNote = (noteInfo, callback) => {
        notemodel.createNote(noteInfo, callback);
    };
    /**
     * 
     * @param {*} noteInfo will take data for the note to update it.
     * @description : updateNote is used to take data from controller 
     *                  then pass it to models for updating the note
     */
    updateNote = (noteData, callback) => {
        const KEY = 'note';
        notemodel.updateNote(noteData, (err, result) => {
            err ? callback(err, null) : redisFunction(KEY, result), callback(null, result);
        });
    };
    /**
     * 
     * @description : retrieveNote is used to retrieve data for all the notes created
     */
    retrieveNote = (callback) => {
        notemodel.retrieveNote((err, result) => {
            err ? callback(err, null) : callback(null, result);
        });
    }
    /**
     * 
     * @param {*} noteIds will take the id for the note you wants to delete
     * @description : deleteNote is used to delete the note which is created earlier.
     */
    deleteNote = (noteIds, callback) => {
        notemodel.deleteNote(noteIds, callback);
    };
    /**
     * 
     * @param {*} data : data comes from the body.
     * @description : addLabelToNote is used to add labels into existing note,
     *               its taking data from controller and passing it to models
     */
    addLabelToNote = (data, callback) => {
        notemodel.addLabelToNote(data, callback);
    };
    /**
     * 
     * @param {*} data : data comes from the body.
     * @description : removeLabelFromNote is used to remove the labels from the existing note,
     *               its taking data from controller and passing it to models
     */
    removeLabelFromNote = (data) => {
        return new Promise((resolve, reject) => {
            const result = notemodel.removeLabelFromNote(data);
            result.then((labelData) => resolve({ labelData }))
                .catch((err) => reject({ err }));
        });
    }
    /**
     * 
     * @param {*} data 
     * @param {*} callback 
     * @description : addCollaborator will add the collaborator by taking data from controller
     *                and passing it to models and then it will send the mail for adding it as well.
     */
    addCollaborator = (data, callback) => {
        notemodel.addCollaborator(data, (err, result) => {
            if (result) {
                (err) ? callback(err, null) : callback(null, help.mail(data));
            }
            else {
                callback('Please check your details again for duplicasy.');
            }
        });
    };
    /**
    * 
    * @param {*} data : data comes from the body.
    * @description : removeCollaborator is used to remove the Collaborator from the existing note,
    *               its taking data from controller and passing it to models
    */
    removeCollaborator = (data) => {
        return new Promise((resolve, reject) => {
            const result = notemodel.removeCollaborator(data);
            result.then((data) => resolve({ data }))
                .catch((err) => reject({ err }));
        });
    }
}

module.exports = new NoteService();