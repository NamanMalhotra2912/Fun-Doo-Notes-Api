/** ***********************************************************************
 * Execution        : 1. default node       cmd> npm start
 *
 * Purpose          : to create the service for business logic of note Api.

 * @file            : note.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0
 ************************************************************************* */
 const note = require('../models/note');
 const notemodel = require('../models/note');
 const {redisFunction} = require('../../helper/validationSchema.js');
 /**
 * @class NoteService to include all notes api.
 * @description create service file to apply business logic for api.
 */ 
class NoteService {
    createNote = (noteInfo, callback) => {
        notemodel.createNote(noteInfo, callback);
    };
        
    updateNote = (noteData, callback) => {
        const KEY = 'note';
        notemodel.updateNote(noteData, (err,result) =>{
            err ? callback(err, null) : redisFunction(KEY, result), callback(null, result); 
        });
    };
    
    retrieveNote = (callback) => {
        notemodel.retrieveNote((err, result) => {
            err ? callback(err, null) : callback(null, result); 
        });
    }
    
    deleteNote = (noteIds, callback) => {
        notemodel.deleteNote(noteIds, callback);
    };
}
  
module.exports = new NoteService();