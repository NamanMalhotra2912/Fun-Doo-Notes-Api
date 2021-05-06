module.exports = (app) => {
    const user = require('../controllers/user.js');
    
    // Create a new Note
    app.post('/ragister', user.createUser);
}

module.exports = (app) => {
    const logIn = require('../controllers/user.js');
    
    // Create a new Note
    app.post('/login', logIn.createLogin);
}