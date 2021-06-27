/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 * 
 * Purpose          : to hit Api of Ragistartion,Login,Forget Password, and Reset password for user.
 *                  : to hit the Api of notes of Create, updatem retrieve and delete notes.
 * 
 * @file            : routes.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 * 
 **************************************************************************/
const passport = require('passport');
const user = require('../controllers/user.js');
const note = require('../controllers/note.js');
const LabelController = require('../controllers/label.js');
const { verifyToken, redisMiddleWare } = require('../../helper/validationSchema.js');
const { isLoggedIn } = require('../../helper/passportAuthentication.js');
/**
 * 
 * @param {*} app 
 * @description creating the routes for api's
 */
module.exports = (app) => {

    app.post('/register', user.createUser);

    app.post('/login', user.login);

    app.post('/forgetPassword', user.forgetPassword);

    app.post('/resetPassword', user.resetPassword);

    app.post('/notes', verifyToken, note.createNote);

    app.put('/notes/:noteId', verifyToken, note.updateNote);

    app.get('/notes', verifyToken, redisMiddleWare, note.retrieveNote);

    app.delete('/notes/:noteId', verifyToken, note.deleteNote);

    app.post('/label', verifyToken, LabelController.createLabel);

    app.put('/label/:labelId', verifyToken, LabelController.updateLabel);

    app.get('/label', verifyToken, LabelController.retrieveLabels);

    app.delete('/label/:labelId', verifyToken, LabelController.deleteLabel);

    app.post('/addLabelToNote', verifyToken, note.addLabelToNote);

    app.delete('/removeLabelFromNote', verifyToken, note.removeLabelFromNote);

    app.post('/addCollaborator', verifyToken, note.addCollaborator);

    app.delete('/removeCollaborator', verifyToken, note.removeCollaborator);

    app.get('/failed', (req, res) => res.send('Failed to login'))

    app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' })
        , isLoggedIn, user.socialLogin);

}