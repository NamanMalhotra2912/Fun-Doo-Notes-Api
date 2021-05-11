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

const userRagistrationModel = require('../models/user.js');
const bcrypt = require('bcrypt');
const help = require ('../../helper/validationSchema.js');

/*
* Creating service file for all api of register, login, forget password and reset password
*/

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
                        callback('Please enter correct password')
                    }
                });

            } else {
                callback('Please check your email id and password');
            }
        });
    }

    forgetPassword = (data, callback) => {
        // console.log(data);
        userRagistrationModel.forgetPassword(data, (err, result) => {
            if(result){
                if(err){
                    callback(err,null);
                }  
                else{
                    callback(null ,help.mail(data));
                }
            }
            else{
                callback('Please check your email id again.');
            }
        });
    };

/*
*  reset password service
*/
    resetPassword = (data ,callback) => {
        userRagistrationModel.resetPassword(data ,callback);
    }
}
module.exports = new userData();