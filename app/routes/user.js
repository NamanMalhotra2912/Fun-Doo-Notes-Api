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

/*
* Creating routes for all api of register, login, forget password and reset password
*/

module.exports = (app) => {
    
    app.post('/register', user.createUser);

    app.post('/login', user.createLogin);

    app.post('/forgetPassword', user.forgetPassword);

    app.post('/resetPassword', user.resetPassword);
}