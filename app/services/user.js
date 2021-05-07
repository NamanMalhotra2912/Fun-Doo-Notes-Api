const userRagistrationModel = require('../models/user.js');
const bcrypt = require('bcrypt');

class userData{

    createUser = (userData, callback) =>{
    userRagistrationModel.createUser(userData,callback);
    }
    
    createLogin = (loginData, callback) => {
        userRagistrationModel.createLogin(loginData ,(_err, result) => {
            if (result) {
                bcrypt.compare(loginData.password, result.password, (err, data) => {
                    if (err) {
                        callback(err ,null);
                    }
                    if (data) {
                        const resultSuccess = {
                            message: 'Successfully logeed in'
                        };
                        callback(null ,resultSuccess)

                    } else {
                        callback('Please enter correcr password')
                    }
                });

            } else {
                callback('Please fill correct email id and password');
            }
        });
    }

    forgetPassword = (data, callback) => {
        userRagistrationModel.forgetPassword(data, (err, result) => {
            if(result){
                callback(null,result);
            }
            else{
                callback('Please check your email id again.');
            }
        })
    }
}
module.exports = new userData();