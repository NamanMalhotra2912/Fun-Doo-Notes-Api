const userRagistrationModel = require('../models/user.js');

class userData{

    createUser = (userData, callback) =>{
        userRagistrationModel.createUser(userData,callback);
    };
}

module.exports = new userData();``