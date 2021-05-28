/** ***********************************************************************
 * Execution        : 1. default node       cmd> npm start
 *
 * Purpose          : To create schema for notes.
 * 
 * @file            : note.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0
 ************************************************************************* */
const mongoose = require('mongoose');
const note = require('../services/note.js');
  /**
   * 
   * @method  noteSchema method  
   * @description Creating the notes schema. 
   * 
   */
  const noteSchema = mongoose.Schema({
    title: {
      type: String, 
      required: true 
    },
    description: {
      type: String,
      required: true 
    },
    isPinned: {
      type: Boolean,
      default: false 
    },
    isArchived: {
      type: Boolean,
      default: false 
    },
    isReminder: {
      type: String, required: false 
    },
    isTrashed: {
      type: Boolean, default: false 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
  }, {
    timestamps: true,
    versionKey: false,
  });
 
const noteModel = mongoose.model('Note', noteSchema);
/**
 * @description created NoteModel class for note api.
 */ 
class NoteModel {
    createNote = (noteInfo, callback) => {
      const note = new noteModel({
        title: noteInfo.title,
        description: noteInfo.description,
        userId: noteInfo.userId
      });
      note.save(callback);
    };
 
    updateNote = (notesID, callback) => {
      noteModel.findByIdAndUpdate(notesID.noteId, {
        title: notesID.title,
        description: notesID.description,
      }, {new: true}).then((noteone) => {
          callback(null, noteone);
      }).catch((err) => {
          callback(err, null);
      });   
    };
 
    retrieveNote = (callback) => {
        noteModel.find((err, notedata) => {
          if(err){
              callback(err ,null);
            }else {
              callback(null ,notedata);
            }
        });     
    };

    deleteNote = (noteIds, callback) => {
        noteModel.findByIdAndRemove(noteIds, (err, noteresult) => {
            if(err){
                callback(err, null);
            }else {
                callback(null, noteresult);
            }
        });
    };
 
}
 
module.exports = new NoteModel();