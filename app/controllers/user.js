/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 * 
 * Purpose          : to create the schemas for user ragistration data.
 *                    
 * 
 * @file            : user.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 * 
**************************************************************************/

const { ragistationSchema, createToken } = require('../../helper/validationSchema.js');
const user = require('../services/user.js');
const jwt = require('jsonwebtoken');

class UserRegistration{
    /**
     * 
     * @method createUser method for registration  
     * @description Creating the user for registration and saving its details 
     * @returns registeration status.
     */
    createUser = (req, res) => {        
        // console.log(req.body);
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password ) {
        return res.status(400).send({
            message : "Fields can't be empty, please fill all details."
        })
    }

    const checkValidation = ragistationSchema.validate(req.body);
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
                success : false,
                message: "Email already exist.",
                error
            });
        }
        else{
            res.status(200).send({
                success : true,
                message: "User Ragistered Successfully",
                // data : result
            });
        }
    });
    }  
    /**
     * 
     * @method createLogin method for login  
     * @description Creating the login for user 
     * @returns login status.
     */
    createLogin = (req, res) => {
        const loginData = {
            email: req.body.email,
            password: req.body.password
        };
    // console.log(loginData);
        user.createLogin(loginData, (error, result) =>{
            console.log(result);
            if(error){
                res.status(400).send({
                    success : false,
                    message: "User is not ragistered",
                    error
                });
            }
            else{
                res.status(200).send({
                    success : true,
                    message: "You are Logged in Successfully.",
                    Token : createToken(result),
                    // data : result
                });
            }
        });
    };
    /**
     * 
     * @method  forgetPassword method  
     * @description Creating the login for user 
     * @returns if correct email entered then will generate mail for reset password.
     */
    forgetPassword = (req, res) => {
        const forgetData = {
            email: req.body.email,
        };
        console.log(forgetData);
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
    /**
     * 
     * @method  resetPassword method  
     * @description Creating the reset password method to reset the password. 
     * @returns returns the reset password status.
     */   
    resetPassword = (req,res) => {
        try {
            const verifyPass = jwt.verify(req.headers.token ,process.env.JWT);
            console.log(verifyPass);
            const resetPass = {
                password: req.body.password, 
                email: verifyPass.name,
            }
            user.resetPassword(resetPass ,(err,result) => {
                if(err) {
                  return res.status(401).send({
                        success: false,
                        message: 'Un-authorized access to reset your password',
                        err,
                    });
                } else {
                  return res.status(200).send({
                        success: true,
                        message: 'Password reset is Successful ',
                        // result,
                    });
                }
            });
        }   catch (error) {
                return res.status(400).send({
                    success: false,
                    message: 'Time-out, please try again to reset your password',
                    error
                });
        }
       
    }
};
module.exports = new UserRegistration();