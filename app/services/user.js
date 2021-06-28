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
const jwt = require('jsonwebtoken');
/**
 * 
 * @description Creating service file for all api of register, login, forget password and reset password
 */
class UserData {
    /**
     * 
     * @param {*} userData 
     * @param {*} callback 
     * @description : createUser will take the request from controller and pass it to models
     */
    createUser = (userData, callback) => {
        userRegistrationModel.createUser(userData, callback);
    }
    /**
     * 
     * @param {*} loginData 
     * @param {*} callback 
     * @description : login will take the request from controller for login
     */
    login = (loginData, callback) => {
        userRegistrationModel.login(loginData, (_err, result) => {
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
    /**
     * 
     * @param {*} data 
     * @param {*} callback 
     * @description : forgetPassword will take the request from controller and pass it to models
     */
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
    /**
     * 
     * @param {*} data 
     * @param {*} callback 
     * @description : resetPassword will take the request from controller and pass it to models
     */
    resetPassword = (data, callback) => {
        userRegistrationModel.resetPassword(data, callback);
    }
    /**
     * 
     * @param {*} socialLoginData 
     * @param {*} callback 
     * @description : socialLogin will take the request from controller and perform the service here
     *                  and pass the details to models
     */
    socialLogin = (socialLoginData, callback) => {
        userRegistrationModel.socialLogin(socialLoginData, (err, result) => {
            if (err) {
                callback(err, null);
            }
            if (result) {
                let payload = {
                    '_id': result._id,
                    'userName': result.userName
                };
                let token = jwt.sign(payload, process.env.JWT);
                callback(null, token)
            } else {
                callback('Please check for details');
            }
        });
    }
}
module.exports = new UserData();