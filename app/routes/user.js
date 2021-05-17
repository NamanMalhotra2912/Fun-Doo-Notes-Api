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
    const user = require('../controllers/user.js');
    const note = require('../controllers/note.js');
    const { verifyToken } = require('../../helper/validationSchema.js');
    /** 
     * @description Creating the routes. 
     */ 
    module.exports = (app) => {
        
        app.post('/register', user.createUser);

        app.post('/login', user.createLogin);

        app.post('/forgetPassword', user.forgetPassword);

        app.post('/resetPassword', user.resetPassword);

        app.post('/notes', verifyToken, note.createNote);

        app.put('/notes/:noteId', verifyToken, note.updateNote);

        app.get('/notes',verifyToken,  note.retrieveNote);

        // app.get('/notes/:noteId', verifyToken, note.getNoteById);

        app.delete('/notes/:noteId', verifyToken, note.deleteNote);

    }