const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type : String,
        required: true,
        unique: true
    },
    password: String,
}, {
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

class userRagistrationModel {
    createUser = (userData ,callback) => {
        const user = new userModel(userData);
        user.save((err, userResult)=> {
            if(err) {
                callback(err ,null);
            }else {
                callback(null ,userResult);
            }
        });
    };

    createLogin = (loginData ,callback) => {
    const user = new userModel(loginData);
    user.save((err, userResult)=> {
        if(err) {
            callback(err ,null);
        }else {
            callback(null ,userResult);
        }
    });
    };

    forgetPasswrod = (data,callback) => {
        userModel.findOne({email: data.email} , callback)
    }
}

module.exports = new userRagistrationModel;