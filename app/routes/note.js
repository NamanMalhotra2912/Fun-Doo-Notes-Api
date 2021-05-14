/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 * 
 * Purpose          : to hit Api of Ragistartion,Login,Forget Password, and Reset password
 *                    
 * 
 * @file            : routes.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 * 
 **************************************************************************/
    const note = require('../controllers/note');
    const helper = require('../../utility/helper');
    /** 
     * @description Creating the routes for note
     */ 
    module.exports = (app) => {
    app.post('/notes', helper.verifyToken, note.createNote);
    
    // app.put('/notes/:noteId', note.updateNote);
    
    //   app.get('/notes', note.getAllNotes);
    };