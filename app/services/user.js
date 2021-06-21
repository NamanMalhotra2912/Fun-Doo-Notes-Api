/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 * 
 * Purpose          : to create the data or service for user registration, login, and forget Api.
 *                    
 * 
 * @file            : user.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 * 
 **************************************************************************/

const userRegistrationModel = require('../models/user.js');
const bcrypt = require('bcrypt');
const help = require('../../helper/validationSchema.js');
/**
 * 
 * @description Creating service file for all api of register, login, forget password and reset password
 */
class UserData {
    createUser = (userData, callback) => {
        userRegistrationModel.createUser(userData, callback);
    }

    login = (loginData, callback) => {
        userRegistrationModel.login(loginData, (_err, result) => {
            // console.log(_err);
            if (result) {
                bcrypt.compare(loginData.password, result.password, (err, data) => {

                    if (err) {
                        callback(err, null);
                    }
                    if (data) {
                        callback(null, result)

                    } else {
                        callback('Please enter correct password')
                    }
                });

            } else {
                callback('Please check your email id and password');
            }
        });
    }

    forgetPassword = (data, callback) => {
        userRegistrationModel.forgetPassword(data, (err, result) => {
            if (result) {
                (err) ? callback(err, null) : callback(null, help.mail(result));
            }
            else {
                callback('Please check your email id again.');
            }
        });
    };


    resetPassword = (data, callback) => {
        userRegistrationModel.resetPassword(data, callback);
    }
}
module.exports = new UserData();