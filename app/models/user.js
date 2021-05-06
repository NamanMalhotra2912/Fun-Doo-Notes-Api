const mongoose = require('mongoose');

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
}

const loginSchema = mongoose.Schema({
    email: {
        type : String,
        required: true,
        unique: true
    },
    password: String,
}, {
    timestamps: true
});

const logModel = mongoose.model('Log' ,loginSchema);

class loginModel {
    createLogin = (userData ,callback) => {
        const user = new logModel(userData);
        user.save((err, userResult)=> {
            if(err) {
                callback(err ,null);
            }else {
                callback(null ,userResult);
            }
        });
    };
}



module.exports = new userRagistrationModel;
module.exports = new loginModel;