const userRagistrationModel = require('../models/user.js');
const loginModel = require('../models/user.js');

class userData{

    createUser = (userData, callback) =>{
        userRagistrationModel.createUser(userData,callback);
    };
}
class loginData{

    createLogin = (loginData, callback) =>{
        loginModel.createLogin(loginData,callback);
    };
}

module.exports = new userData();
module.exports = new loginData();