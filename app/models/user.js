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
    createUser = (userData, callback) => {
        const user = new userModel(userData);
        user.save((err, userResult) => {
            (err) ? callback(err, null) : callback(null, userResult);
        });
    };

    login = async (loginData, callback) => {
        const check = await userModel.findOne({ email: loginData.email })
        check ? callback(null, check) : callback("login failed");
    };

    forgetPassword = (data, callback) => {
        userModel.findOne({ email: data.email }, callback)
    }

    resetPassword = async (data, callback) => {
        // console.log(data.email);
        const salt = await bcrypt.genSalt(10);
        const encrypt = await bcrypt.hash(data.password, salt);
        UserRegistrationModel.findOneAndUpdate({ email: data.email }, { password: encrypt }, { new: true }, callback(null, data));
    }
}

module.exports = new UserRegistrationModel;