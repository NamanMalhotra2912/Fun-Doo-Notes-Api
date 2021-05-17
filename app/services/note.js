/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : Having Business Logic of perticular API

 * @file            : note.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0
 ************************************************************************* */
 const note = require('../models/note');
 const notemodel = require('../models/note');
 
class NoteService {
    createNote = (noteInfo, callback) => {
        notemodel.createNote(noteInfo, callback);
    };
        
    updateNote = (noteData, callback) => {
        notemodel.updateNote(noteData, callback);
    };
    
    retrieveNote = (callback) => {
        notemodel.retrieveNote((err, result) => {
            err ? callback(err, null) : callback(null, result); 
        });
    };
    
    deleteNote = (noteIds, callback) => {
        notemodel.deleteNote(noteIds, callback);
    };
}
 
 
module.exports = new NoteService();
 