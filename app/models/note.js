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
 * @function  noteSchema method  
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
  labelId: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Label'
  }],
  collaborator: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],
}, {
  timestamps: true,
  versionKey: false,
});

const noteModel = mongoose.model('Note', noteSchema);
/**
 * @description created NoteModel class for note api
 */
class NoteModel {
  /**
   * 
   * @param {*} noteInfo : here we will save our data.
   * @description : createNote is used to create and save the note data.
   */
  createNote = (noteInfo, callback) => {
    const note = new noteModel({
      title: noteInfo.title,
      description: noteInfo.description,
      userId: noteInfo.userId
    });
    note.save(callback);
  };
  /**
   * 
   * @param {*} notesID : here we will use the id to update the note.
   * @description : updateNote is used to update the note.
   */
  updateNote = (notesID, callback) => {
    noteModel.findByIdAndUpdate(notesID.noteId, {
      title: notesID.title,
      description: notesID.description,
    }, { new: true }).then((noteone) => {
      callback(null, noteone);
    }).catch((err) => {
      callback(err, null);
    });
  };
  /**
   * 
   * @param {*} callback
   * @description : here retrieveNote is used to retrieve all the notes created.
   */
  retrieveNote = (callback) => {
    noteModel.find((err, notedata) => {
      (err) ? callback(err, null) : callback(null, notedata);
    });
  };
  /**
   * 
   * @description : deleteNote is used to delete the particular note with its id.
   */
  deleteNote = (noteIds, callback) => {
    noteModel.findByIdAndRemove(noteIds, (err, noteresult) => {
      (err) ? callback(err, null) : callback(null, noteresult);
    });
  };
  /**
   * 
   * @param {*} data 
   * @returns {*} callback 
   * @description : addLabelToNote will add the label to note in array.
   */
  addLabelToNote = async (data, callback) => {
    const result = await noteModel.findByIdAndUpdate(data.noteId, {
      $push: {
        labelId: data.labelId
      }
    });
    callback(null, result);
  };
  /**
   * 
   * @param {*} data 
   * @description : removeLabelFromNote will remove the label from the note.
   */
  removeLabelFromNote = (data) => {
    return new Promise((resolve, reject) => {
      noteModel.findByIdAndUpdate(data.noteId,
        {
          $pull: {
            labelId: data.labelId
          }
        })
        .then((label) =>
          resolve(label))
        .catch((err) =>
          reject(err));
    });
  }
  /**
   * 
   * @param {*} data 
   * @param {*} callback 
   * @description : addCollaborator will add the collaborator into note
   */
  addCollaborator = async (data, callback) => {
    const result = await noteModel.findByIdAndUpdate(data.noteId, {
      $push: {
        collaborator: data.collaborator
      }
    });
    callback(null, result);
  };
  /**
  * 
  * @param {*} data 
  * @description : removeLabelFromNote will remove the label from the note.
  */
  removeLabelFromNote = (data) => {
    return new Promise((resolve, reject) => {
      noteModel.findByIdAndUpdate(data.noteId,
        {
          $pull: {
            collaborator: data.collaborator
          }
        })
        .then((collaborator) =>
          resolve(collaborator))
        .catch((err) =>
          reject(err));
    });
  }

}
module.exports = new NoteModel();