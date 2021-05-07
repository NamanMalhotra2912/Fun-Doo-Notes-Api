/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * Purpose          : to hit the perticular API
 *                    
 *                     
 *                    
 * 
 * @file            : routes.js
 * @author          : Sapna Patil
 * @version         : 1.0
 * @since           : 01-10-2018
 * 
 **************************************************************************/
const user = require('../controllers/user.js');     

module.exports = (app) => {
    
    app.post('/ragister', user.createUser);

    app.post('/login', user.createLogin);

    app.post('/forgetPassword', user.forgetPassword);
}