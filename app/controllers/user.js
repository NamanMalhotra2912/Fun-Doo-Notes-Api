const { authSchema, createToken } = require('../../helper/validationSchema.js');
const user = require('../services/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const 

class UserRagistration{

    createUser = (req, res) => {        
        // console.log(req.body);
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password ) {
        return res.status(400).send({
            message : "Fields can't be empty, please fill all details."
        })
    }

    const checkValidation = authSchema.validate(req.body);
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
                // message: error.message
                message: "Please check it again.",
                
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
    const loginData = {
        email: req.body.email,
        password: req.body.password
    };
    user.createLogin(loginData, (error, result) =>{
        if(error){
            res.status(400).send({
                message: "Already Login ",
            });
        }
        else{
            res.status(200).send({
                message: "You are Logged in Successfully.",
                Token : createToken(data),
                // data : result
            });
        }
    });
};

    forgetPassword = (req, res) => {
        const forgetData = {
            email: req.body.email,
        };
        user.forgetPassword(forgetData, (error, result) =>{
            if(error){
                res.status(500).send({
                    success : false,
                    message: "Sorry, please check and share correct details.",
                    error
                });
            }
            else{
                res.status(200).send({
                    success : true,
                    message: "You can reset your password, and mail will be sent to you shortly.",
                    result
                });
            }
        });
    }
};
module.exports = new UserRagistration();