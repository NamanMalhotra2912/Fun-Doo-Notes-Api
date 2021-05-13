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
     * @description Creating user schema for user details.
     */
const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type : String,
        required: true,
        unique: true
    },
    password:{
        type: String
    },
}, {
    versionKey : false
},
{
    timestamps: true
});
userSchema.pre('save', async function (next) {
    try {
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(this.password , salt)
       this.password = hashedPassword
       next() 
    } catch (error)
     {
        next(error)
     }
    
});

const userModel = mongoose.model('User' ,userSchema);

class userRegistrationModel {
    createUser = (userData ,callback) => {
        const user = new userModel(userData);
        user.save((err, userResult)=> {
            (err) ? callback(err ,null) : callback(null ,userResult);
        });
    };

    createLogin = (loginData, callback) => {
        userModel.findOne({email: loginData.email}, callback)
    };

    forgetPassword = (data,callback) => {
        userModel.findOne({email: data.email} , callback)
    }

    resetPassword = async (data, callback) => {
        const salt = await bcrypt.genSalt(10);
        const encrypt = await bcrypt.hash(data.password, salt);
        userRagistrationModel.findOneAndUpdate({ email: data.email }, { password: encrypt } ,{new: true} ,callback)      
    }
}

module.exports = new userRegistrationModel;