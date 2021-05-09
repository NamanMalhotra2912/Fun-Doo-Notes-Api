/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * Purpose          : to hit the perticular API
 *                    
 * 
 * @file            : routes.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0
 * @since           : 07-05-2020
 * 
 **************************************************************************/
const user = require('../controllers/user.js');     

module.exports = (app) => {
    
    app.post('/ragister', user.createUser);

    app.post('/login', user.createLogin);

    app.post('/forgetPassword', user.forgetPassword);
}