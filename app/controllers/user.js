const { authSchema, loginSchema, createToken } = require('../../helper/validationSchema.js');

const user = require('../services/user.js');
const logIn = require('../services/user.js');
const jwt = require('jsonwebtoken');
class UserRagistration{

    createUser = (req, res) => {
        
        // console.log(req.body);
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password ) {
        return res.status(400).send({
            message : "Fields can't be empty, please fill all details."
        })
    }

    const checkValidation = authSchema.validate(req.body);
        // console.log(checkValidatio);
        if (checkValidation.error){
            return res.send("Please enter correct details for ragistration.");
        }        
        const userDetails = {
            firstName: req.body.firstName, 
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };

        user.createUser(userDetails, (error, result) =>{
        if(error){
            res.status(400).send({
                message: error.message
            });
        }
        else{
            res.status(200).send({
                message: "Data has been added suceesfully.",
                data : result
            });
        }
    });
    }    
    
    createLogin = (req, res) => {
    // console.log(req.body);
    if(!req.body.email || !req.body.password ) {
        return res.status(400).send({
            message : "Please fill correct email id and password."
        })
    }

    const checkLoginValidation = loginSchema.validate(req.body);
    if (checkLoginValidation.error){
        return res.send("Please enter correct details for login.");
    }
    const loginDetails = {
        email: req.body.email,
        password: req.body.password
    };
    logIn.createLogin(loginDetails, (error, result) =>{
        if(error){
            res.status(400).send({
                // message: "Already Login ",        // need to check
                message: error.message
            });
        }
        else{
            res.status(200).send({
                message: "Login Successful.",
                token : createToken(data),
                // data : result
            });
        }
    });
};
    
};
module.exports = new UserRagistration();