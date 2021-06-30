/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 * 
 * Purpose          : to create the schemas for user ragistration.
 *                    
 * 
 * @file            : user.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 * 
 **************************************************************************/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { boolean } = require('@hapi/joi');
/**
 * 
 * @method  userSchema method  
 * @description Creating the user schema for user details. 
 * @returns save the encrypted password and other details.
 */
const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    googleId: {
        type: String
    },
    googleLogin: {
        type: Boolean
    },
}, {
    versionKey: false
},
    {
        timestamps: true
    });
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }

});

const userModel = mongoose.model('User', userSchema);

class UserRegistrationModel {
    /**
     * 
     * @param {*} userData 
     * @param {*} callback 
     * @description : createUser will take the request from services and create the user according to schema
     */
    createUser = (userData, callback) => {
        const user = new userModel(userData);
        user.save((err, userResult) => {
            (err) ? callback(err, null) : callback(null, userResult);
        });
    };
    /**
     * 
     * @param {*} loginData 
     * @param {*} callback 
     * @description : login will allow the user to pass details for login
     */
    login = async (loginData, callback) => {
        const check = await userModel.findOne({ email: loginData.email })
        check ? callback(null, check) : callback("login failed");
    };
    /**
     * 
     * @param {*} data 
     * @param {*} callback 
     * @description : forgetPassword will help the user to reset the password
     */
    forgetPassword = (data, callback) => {
        userModel.findOne({ email: data.email }, callback)
    }
    /**
     * 
     * @param {*} data 
     * @param {*} callback 
     * @description : resetPassword will help the user to reset its password again
     */
    resetPassword = async (data, callback) => {
        // console.log(data.email);
        const salt = await bcrypt.genSalt(10);
        const encrypt = await bcrypt.hash(data.password, salt);
        userModel.findOneAndUpdate({ email: data.email }, { password: encrypt }, { new: true }, callback(null, data));
    }
    /**
     * 
     * @param {*} socialLoginData 
     * @param {*} callback 
     * @description : socialLogin will allow the user to login throgh google
     */
    async socialLogin(socialData) {
        return userModel.findOne({ 'userName': socialData.userName }).then(result => {
            if (result) {
                return result
            } else {
                const details = new userModel({
                    'firstName': socialData.firstName,
                    'lastName': socialData.lastName,
                    'userName': socialData.userName,
                    'password': socialData.password,
                    'googleId': socialData.googleId,
                    'googleLogin': socialData.googleLogin,
                });
                return details.save();
            }
        }).catch(err => {
            return ('Please check for the error', err);
        });
    };
}

module.exports = new UserRegistrationModel;